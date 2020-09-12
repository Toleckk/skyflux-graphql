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
  user_id,
}: {
  oldPassword: string
  newPassword: string
  user_id: string
}): Promise<boolean> => {
  const user = await UserModel.findById(user_id)

  if (!user) return false

  if (user.password !== oldPassword) return false

  user.password = newPassword
  await user.save()

  return true
}

export const updateNickname = async ({
  user_id,
  nickname,
}: {
  user_id: string
  nickname: string
}): Promise<User | null> => {
  const user = await UserModel.findById(user_id)

  if (!user) return null

  if (nickname === user.nickname) return user

  user.nickname = nickname
  await user.save()

  return user
}

export const updateProfileInfo = async ({
  avatar,
  description,
  user_id,
}: {
  avatar?: string
  description: UserDescription
  user_id: string
}): Promise<User | null> => {
  const user = await UserModel.findById(user_id)

  if (!user) return null

  user.avatar = avatar
  user.description = description
  await user.save()

  return user
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
