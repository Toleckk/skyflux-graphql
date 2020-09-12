import {UserService} from '@models/user'
import {Sub} from './types'
import {SubModel} from './model'

export const createSub = async ({
  nickname,
  user_id,
}: {
  nickname: string
  user_id: string
}): Promise<Partial<Sub> | null> => {
  const user = await UserService.getUserByNickname({nickname})

  if (!user) return null

  const sub = await SubModel.create({from_id: user_id, to_id: user._id})

  return {
    ...sub.toObject(),
    to: user,
  }
}

export const removeSub = async ({
  nickname,
  user_id,
}: {
  nickname: string
  user_id: string
}): Promise<boolean> => {
  const user = await UserService.getUserByNickname({nickname})

  if (!user) return false

  const deleted = await SubModel.deleteOne({from: user_id, to: user._id})
  return (deleted?.deletedCount || 0) > 0
}
