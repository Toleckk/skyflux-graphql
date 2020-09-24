import Mongoose from 'mongoose'
import {User, UserService} from '@models/user'
import {isMongoId} from '@utils/isMongoId'
import {Sub} from './types'
import {SubModel} from './model'

export const createSub = async ({
  nickname,
  user,
}: {
  nickname: string
  user: User
}): Promise<Partial<Sub> | null> => {
  const to = await UserService.getUserByNickname({nickname})

  if (!to) return null

  const sub = await SubModel.create({from_id: user._id, to_id: to._id})

  return {
    ...sub.toObject(),
    to,
    from: user,
  }
}

export const removeSub = async ({
  nickname,
  user,
}: {
  nickname: string
  user: User
}): Promise<boolean> => {
  const to = await UserService.getUserByNickname({nickname})

  if (!to) return false

  const deleted = await SubModel.deleteOne({from_id: user._id, to_id: to._id})
  return (deleted?.deletedCount || 0) > 0
}

export const getSubById = async ({
  _id,
}: {
  _id: string | Mongoose.Types.ObjectId
}): Promise<Partial<Sub> | null> => SubModel.findById(_id)

export const resolveSub = ({
  root,
}: {
  root:
    | {sub: Partial<Sub>}
    | {sub_id: Partial<Sub> | string | Mongoose.Types.ObjectId}
}): Promise<Partial<Sub> | null> | Partial<Sub> => {
  if ('sub' in root) return root.sub

  if (typeof root.sub_id !== 'string' && !isMongoId(root.sub_id))
    return root.sub_id

  return getSubById({_id: root.sub_id})
}
