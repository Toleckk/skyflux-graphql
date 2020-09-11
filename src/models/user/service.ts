import Mongoose from 'mongoose'
import {generateNickname} from '@utils/generateNickname'
import {User, UserDocument, UserModel} from '@models/user'
import {ResetModel} from '@models/reset'

export const createUser = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<User> => {
  const nickname = generateNickname()
  return await UserModel.create({nickname, email, password})
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
