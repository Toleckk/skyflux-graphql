import {v4} from 'uuid'
import {ModelOptions} from 'mongoose'
import {UserModel} from '@models/user'
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

  await ResetModel.create({user_id: user._id, token: v4()})

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
