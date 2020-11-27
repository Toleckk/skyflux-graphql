import {v4} from 'uuid'
import {ModelOptions} from 'mongoose'
import {UserNotFoundError} from '@skyflux/api/errors'
import {UserModel} from '@skyflux/api/models/user'
import {EmailService} from '@skyflux/api/models/email'
import {ResetDocument} from './types'
import {ResetModel} from './model'

export const createResetRequest = async (login: string): Promise<boolean> => {
  const user = await UserModel.findOne({
    $or: [{nickname: login}, {email: login}],
  })

  if (!user) throw new UserNotFoundError()

  const token = v4()

  await ResetModel.create({user: user._id, token})

  await EmailService.sendEmail({
    email: user.email,
    subject: 'Password resetting',
    template: 'restore',
    payload: {user, token},
  })

  return true
}

export const getResetByToken = async (
  token: string,
): Promise<ResetDocument | null> => ResetModel.findOne({token})

export const deleteResetByToken = async (
  token: string,
  options?: ModelOptions,
): Promise<boolean> => {
  const {deletedCount} = await ResetModel.deleteOne({token}, options || {})
  return (deletedCount || 0) > 0
}
