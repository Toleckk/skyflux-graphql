import {v4} from 'uuid'
import {ModelOptions} from 'mongoose'
import {UserModel} from '@models/user'
import {EmailService} from '@models/email'
import {ResetDocument} from './types'
import {ResetModel} from './model'

export const createResetRequest = async ({
  login,
}: {
  login: string
}): Promise<boolean> => {
  const user = await UserModel.findOne({
    $or: [{nickname: login}, {email: login}],
  })

  if (!user) return false

  const token = v4()

  await ResetModel.create({user_id: user._id, token})

  await EmailService.sendEmail({
    email: user.email,
    subject: 'Password resetting',
    template: 'restore',
    payload: {user, token},
  })

  return true
}

export const getResetByToken = async ({
  token,
}: {
  token: string
}): Promise<ResetDocument | null> => ResetModel.findOne({token})

export const deleteResetByToken = async ({
  token,
  options,
}: {
  token: string
  options?: ModelOptions
}): Promise<boolean> => {
  const {deletedCount} = await ResetModel.deleteOne({token}, options || {})
  return (deletedCount || 0) > 0
}
