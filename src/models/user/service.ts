import Mongoose, {ModelUpdateOptions} from 'mongoose'
import {Description, User, UserDbObject} from '@skyflux/api/models/types'
import {UserModel} from '@skyflux/api/models/user'
import {generateNickname} from '@skyflux/api/utils/generateNickname'
import {isMongoId} from '@skyflux/api/utils/isMongoId'
import {makeSearchPipeline} from '@skyflux/api/utils/makeSearchPipeline'
import {toUTCDate} from '@skyflux/api/utils/toUtcDate'

/** Creates a new user with passed email and password and generated nickname */
export const createUser = async (): Promise<UserDbObject> => {
  return UserModel.create({
    nickname: generateNickname(),
    private: false,
    description: {},
  } as any)
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
        let: {userId: '$_id'},
        pipeline: [
          {$match: {$expr: {$eq: ['$user', '$$userId']}}},
          {$match: {deleted: {$ne: true}}},
          {$limit: 1},
        ],
        as: 'posts',
      },
    },
    {$match: {posts: {$gt: {$size: 0}}}},
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
