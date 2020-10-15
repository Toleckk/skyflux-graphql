import Mongoose from 'mongoose'
import {ID} from '@models/types'
import {EventService} from '@models/event'
import {User, UserService} from '@models/user'
import {isMongoId} from '@utils/isMongoId'
import {subRequested} from './events'
import {Sub, SubDocument} from './types'
import {SubModel} from './model'

export const createSub = async ({
  nickname,
  user,
}: {
  nickname: string
  user: User
}): Promise<Partial<Sub> | null> => {
  if (user.nickname === nickname) return null

  const to = await UserService.getUserByNickname({nickname})

  if (!to) return null

  const sub = await SubModel.create({
    from_id: user._id,
    to_id: to._id,
    accepted: !to.private,
  })

  await EventService.createEvent(subRequested({sub}))

  return {
    ...sub.toObject(),
    to,
    from: user,
  }
}

export const deleteSub = async ({
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

export const resolveSub = async ({
  root,
}: {
  root:
    | {sub: Partial<Sub>}
    | {sub_id: Partial<Sub> | string | Mongoose.Types.ObjectId}
}): Promise<Partial<Sub> | null> => {
  if ('sub' in root) return root.sub

  if (typeof root.sub_id !== 'string' && !isMongoId(root.sub_id))
    return root.sub_id

  return getSubById({_id: root.sub_id})
}

export const acceptSub = async ({
  user,
  sub_id,
}: {
  user: User
  sub_id: ID
}): Promise<Partial<Sub> | null> => {
  const sub = await SubModel.findOne({_id: sub_id, to_id: user._id})

  if (!sub) return null

  sub.accepted = true
  sub.save()

  return sub
}

export const isSubscribedBy = async ({
  from,
  to,
}: {
  from?: User
  to: User
}): Promise<boolean> => {
  if (!from) return false

  return SubModel.exists({
    from_id: from._id,
    to_id: to._id,
    accepted: true,
  })
}

export const countSubs = async ({user}: {user: User}): Promise<number> =>
  SubModel.count({from_id: user._id, accepted: true})

export const countSubscribers = async ({user}: {user: User}): Promise<number> =>
  SubModel.count({to_id: user._id, accepted: true})

export const countSubRequests = async ({user}: {user: User}): Promise<number> =>
  user.private ? SubModel.count({to_id: user._id, accepted: false}) : 0

export const getSubRequests = async ({
  user,
  first = 25,
  after = 'ffffffffffffffffffffffff',
}: {
  user: User
  first?: number
  after?: ID
}): Promise<SubDocument[]> =>
  SubModel.find({
    accepted: false,
    to_id: user._id,
    _id: {$lt: Mongoose.Types.ObjectId(after)},
  }).limit(first + 1)
