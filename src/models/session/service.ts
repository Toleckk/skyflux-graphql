import {v4} from 'uuid'
import {InvalidPasswordError, UserNotFoundError} from '@skyflux/api/errors'
import {UserDbObject} from '@skyflux/api/models/types'
import {UserModel, UserService} from '@skyflux/api/models/user'
import {SessionModel} from './model'

export const getMe = async (token: string): Promise<UserDbObject | null> => {
  const session = await SessionModel.findOne({token})
  if (!session) return null

  return UserService.getUserById(session.user)
}

export const createSession = async (
  login: string,
  password: string,
): Promise<string | null> => {
  const user = await UserModel.findOne({
    $or: [{nickname: login}, {email: login}],
  })

  if (!user) throw new UserNotFoundError()

  if (user.password !== password) throw new InvalidPasswordError()

  const token = v4()
  await SessionModel.create({token, user: user._id})

  return token
}

export const deleteByToken = async (
  token: string,
  user: UserDbObject,
): Promise<boolean> => {
  const res = await SessionModel.deleteOne({token, user: user._id})
  return (res?.deletedCount || 0) > 0
}
