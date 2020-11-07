import {v4} from 'uuid'
import {InvalidPasswordError, UserNotFoundError} from '@errors'
import {User, UserModel} from '../user'
import {SessionModel} from './model'

export const getMe = async (token: string): Promise<User | null> => {
  const session = await SessionModel.findOne({token}).populate('user_id')
  return session?.user_id as User | null
}

export const createSession = async ({
  login,
  password,
}: {
  login: string
  password: string
}): Promise<string | null> => {
  const user = await UserModel.findOne({
    $or: [{nickname: login}, {email: login}],
  })

  if (!user) throw new UserNotFoundError()

  if (user.password !== password) throw new InvalidPasswordError()

  const token = v4()
  await SessionModel.create({token, user_id: user._id})

  return token
}

export const deleteByToken = async ({
  token,
  user,
}: {
  token: string
  user: User
}): Promise<boolean> => {
  const res = await SessionModel.deleteOne({token, user_id: user._id})
  return (res?.deletedCount || 0) > 0
}
