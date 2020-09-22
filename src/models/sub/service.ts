import {User, UserService} from '@models/user'
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
