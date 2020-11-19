import Mongoose, {ModelUpdateOptions} from 'mongoose'
import {Description, User, UserDbObject} from '@models/types'
import {UserModel} from '@models/user'
import {ResetService} from '@models/reset'
import {ChannelService} from '@models/channel'
import {EmailService} from '@models/email'
import {generateNickname} from '@utils/generateNickname'
import {isMongoId} from '@utils/isMongoId'
import {makeSearchPipeline} from '@utils/makeSearchPipeline'
import {toUTCDate} from '@utils/toUtcDate'

/** Creates a new user with passed email and password and generated nickname */
export const createUser = async (
  email: string,
  password: string,
): Promise<UserDbObject> => {
  const nickname = generateNickname()

  const user = await UserModel.create({
    nickname,
    email,
    password,
    private: false,
    description: {},
  })

  await EmailService.changeEmail(user.email, user)

  await ChannelService.subscribeUserToChannel(user, `Sub_${user._id}`)

  return user
}

/** Updates user password by reset token */
export const resetPassword = async (
  token: string,
  password: string,
): Promise<boolean> => {
  const request = await ResetService.getResetByToken(token)

  if (!request) return false

  const session = await Mongoose.startSession()
  await session.withTransaction(async () => {
    await UserModel.updateOne({_id: request.user}, {password}, {session})
    await ResetService.deleteResetByToken(token, {session})
  })

  return true
}

/** Updates user password by old password */
export const updatePassword = async (
  user: User | UserDbObject,
  oldPassword: string,
  newPassword: string,
): Promise<boolean> => {
  const userDoc = await UserModel.findById(user._id)

  if (!userDoc) return false

  if (userDoc.password !== oldPassword) return false

  userDoc.password = newPassword
  await userDoc.save()

  return true
}

/** Updates user's 'about', 'birthday', 'from' and 'avatar' */
export const updateProfileInfo = async (
  user: User | UserDbObject,
  info: {
    avatar?: string | null
    description: Description
  },
): Promise<UserDbObject | null> => {
  const userDoc = await UserModel.findById(user._id)

  if (!userDoc) return null

  userDoc.avatar = info.avatar
  userDoc.description = {
    ...info.description,
    birthday: info.description.birthday && toUTCDate(info.description.birthday),
  }
  await userDoc.save()

  return userDoc
}

/** Updates user by setting the 'private' field to false */
export const makePublic = async (
  user: User | UserDbObject,
): Promise<User | UserDbObject> => {
  const session = await Mongoose.startSession()
  session.startTransaction()

  const updatedUser = await setPrivate(user, false, {session})

  await session.commitTransaction()

  return updatedUser
}

/** Updates user by setting the 'private' field to true */
export const makePrivate = (
  user: User | UserDbObject,
): Promise<User | UserDbObject> => setPrivate(user, true)

/** Updates user with specified 'private' value */
export const setPrivate = async (
  user: User | UserDbObject,
  isPrivate: boolean,
  options: ModelUpdateOptions = {},
): Promise<User | UserDbObject> => {
  if (user.private === isPrivate) return user

  await UserModel.updateOne({_id: user._id}, {private: isPrivate}, options)

  user.private = isPrivate
  return user
}

/** Updates user nickname */
export const updateNickname = async (
  user: User | UserDbObject,
  nickname: string,
): Promise<User | UserDbObject> => {
  if (nickname === user.nickname) return user

  await UserModel.updateOne({_id: user._id}, {nickname})

  user.nickname = nickname
  return user
}

/** Changes email by token */
export const confirmEmail = async (token: string): Promise<boolean> => {
  const request = await EmailService.getRequestByToken(token)

  if (!request) return false

  const user = await getUserById(request.user)

  if (!user) return false

  const session = await Mongoose.startSession()
  await session.withTransaction(async () => {
    await UserModel.updateOne(
      {_id: user._id},
      {email: request.email},
      {session},
    )
    await EmailService.deleteAllUserRequests(user, {session})
  })

  return true
}

/** Checks if user with specified nickname exists */
export const doesNicknameExist = async (nickname: string): Promise<boolean> =>
  UserModel.exists({nickname})

/** Searches users by nickname */
export const getFoundUsers = async (
  text: string,
  user: User | UserDbObject | undefined,
  first: number,
  after?: string,
): Promise<User[]> => {
  const users = await UserModel.aggregate([
    ...makeSearchPipeline({text, after, field: 'nickname'}),
    {$limit: first + 1},
  ])

  return users.map(user => ({
    ...user,
    __cursor: [user.score, user._id].join(' '),
  }))
}

/** Returns user by specified id if exists */
export const getUserById = async (
  _id: string | Mongoose.Types.ObjectId,
): Promise<UserDbObject | null> => UserModel.findById(_id)

/** Returns user by specified nickname if exists */
export const getUserByNickname = async (
  nickname: string,
): Promise<UserDbObject | null> => {
  const user = await UserModel.findOne({nickname})
  return user || null
}

/**
 * Returns users suggested for subs.
 * Searches public accounts, who own any post
 */
export const getSuggestions = async (
  user: User | UserDbObject,
  first: number,
): Promise<User[]> =>
  UserModel.aggregate([
    {$match: {_id: {$ne: user._id}, private: false}},
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: 'user',
        as: 'posts',
      },
    },
    {$match: {posts: {$gt: [{$size: 'posts'}, 1]}}},
    {$limit: first},
  ])

/** Resolves user from object that contains user_id or user field */
export const resolveUser = async (root: {
  user: User | UserDbObject | Mongoose.Types.ObjectId | string
}): Promise<UserDbObject | User | null> => {
  if (typeof root.user === 'string' || isMongoId(root.user))
    return getUserById(root.user)

  return root.user
}

export const isUsersEqual = (
  userA:
    | User
    | UserDbObject
    | Mongoose.Types.ObjectId
    | string
    | null
    | undefined,
  userB:
    | User
    | UserDbObject
    | Mongoose.Types.ObjectId
    | string
    | null
    | undefined,
): boolean => {
  if ((userA && !userB) || (userB && !userA)) return false

  if (!userA && !userB) return true

  if (userA === userB) return true

  if (isMongoId(userA) || typeof userA === 'string') {
    if (isMongoId(userB) || typeof userB === 'string')
      return String(userA) === String(userB)

    return String(userA) === String(userB?._id)
  }

  if (isMongoId(userB) || typeof userB === 'string')
    return String(userA?._id) === String(userB)

  return String(userA?._id) === String(userB?._id)
}
