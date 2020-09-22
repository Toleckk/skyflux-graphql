import Mongoose from 'mongoose'
import {generateNickname} from '@utils/generateNickname'
import {User, UserDescription, UserDocument, UserModel} from '@models/user'
import {ResetModel} from '@models/reset'

export const createUser = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<User> => {
  const nickname = generateNickname()
  return await UserModel.create({nickname, email, password, description: {}})
}

export const resetPassword = async ({
  token,
  password,
}: {
  token: string
  password: string
}): Promise<boolean> => {
  const request = await ResetModel.findOne({token}).populate('user_id')

  if (!request) return false

  const user = request.user_id as UserDocument
  user.password = password

  const session = await Mongoose.startSession()
  await session.withTransaction(async () => {
    await user.save({session})
    await request.deleteOne({session})
  })

  return true
}

export const updatePassword = async ({
  oldPassword,
  newPassword,
  user,
}: {
  oldPassword: string
  newPassword: string
  user: User
}): Promise<boolean> => {
  const userDoc = await UserModel.findById(user._id)

  if (!userDoc) return false

  if (userDoc.password !== oldPassword) return false

  userDoc.password = newPassword
  await userDoc.save()

  return true
}

export const updateNickname = async ({
  user,
  nickname,
}: {
  user: User
  nickname: string
}): Promise<User | null> => {
  if (nickname === user.nickname) return user

  const updated = await UserModel.updateOne({_id: user._id}, {nickname})

  if (!updated.nModified) return null

  user.nickname = nickname
  return user
}

export const updateProfileInfo = async ({
  avatar,
  description,
  user,
}: {
  avatar?: string
  description: UserDescription
  user: User
}): Promise<User | null> => {
  const userDoc = await UserModel.findById(user._id)

  if (!userDoc) return null

  userDoc.avatar = avatar
  userDoc.description = description
  await userDoc.save()

  return userDoc
}

export const doesNicknameExist = async ({
  nickname,
}: {
  nickname: string
}): Promise<boolean> => UserModel.exists({nickname})

export const getUserById = async ({
  _id,
}: {
  _id: string
}): Promise<User | null> => {
  const user = await UserModel.findById(_id)
  return user || null
}

export const getUserByNickname = async ({
  nickname,
}: {
  nickname: string
}): Promise<User | null> => {
  const user = await UserModel.findOne({nickname})
  return user || null
}
