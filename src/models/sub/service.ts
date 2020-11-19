import Mongoose from 'mongoose'
import {pubsub} from '@pubsub'
import {EventService} from '@models/event'
import {UserService} from '@models/user'
import {isMongoId} from '@utils/isMongoId'
import {Scalars, Sub, SubDbObject, User, UserDbObject} from '@models/types'
import {subRequested} from './events'
import {SubModel} from './model'

export const createSub = async (
  nickname: string,
  user: UserDbObject,
): Promise<SubDbObject | Sub | null> => {
  if (user.nickname === nickname) return null

  const to = await UserService.getUserByNickname(nickname)

  if (!to) return null

  const subDocument = await SubModel.create({
    from: user._id,
    to: to._id,
    accepted: !to.private,
  })

  const sub: Sub = {
    ...subDocument.toObject(),
    to,
    from: user,
  }

  await EventService.createEvent(subRequested({sub, user}))
  await pubsub.publish('sub', {subUpdated: sub})

  return sub
}

export const deleteSub = async (
  nickname: string,
  user: UserDbObject,
): Promise<SubDbObject | null> => {
  const to = await UserService.getUserByNickname(nickname)

  if (!to) return null

  const sub = await SubModel.findOne({from: user._id, to: to._id})

  if (!sub) return null

  return remove(sub.toObject(), user)
}

export const getSubById = async (
  _id: string | Mongoose.Types.ObjectId,
): Promise<SubDbObject | null> => {
  const sub = await SubModel.findById(_id)
  return sub?.toObject()
}

export const resolveSub = async (root: {
  sub: Sub | SubDbObject | Mongoose.Types.ObjectId | string
}): Promise<Sub | SubDbObject | null> => {
  if (typeof root.sub === 'string' || isMongoId(root.sub))
    return getSubById(root.sub)

  return root.sub
}

export const acceptSub = async (
  _id: Scalars['ID'],
  user: UserDbObject,
): Promise<SubDbObject | null> => {
  const subDocument = await SubModel.findOne({_id, to: user._id})

  if (!subDocument) return null

  subDocument.accepted = true
  await subDocument.save()

  const sub = {
    ...subDocument.toObject(),
    to: user,
  }

  await pubsub.publish('sub', {subAccepted: sub})
  await pubsub.publish('sub', {subUpdated: sub})

  return sub
}

export const isSubscribedBy = async (
  to: User | UserDbObject,
  from?: User | UserDbObject,
): Promise<boolean> => {
  if (!from) return false

  return SubModel.exists({
    from: from._id,
    to: to._id,
    accepted: true,
  })
}

export const countSubs = async (user: User): Promise<number> =>
  SubModel.count({from: user._id, accepted: true})

export const countSubscribers = async (user: User): Promise<number> =>
  SubModel.count({to: user._id, accepted: true})

export const countSubRequests = async (user: UserDbObject): Promise<number> =>
  user.private ? SubModel.count({to: user._id, accepted: false}) : 0

export const getSubRequests = async (
  user: UserDbObject,
  first = 25,
  after = 'ffffffffffffffffffffffff',
): Promise<SubDbObject[]> =>
  SubModel.find({
    accepted: false,
    to: user._id,
    _id: {$lt: Mongoose.Types.ObjectId(after)},
  })
    .sort({_id: -1})
    .limit(first + 1)

export const declineSub = async (
  _id: Scalars['ID'],
  user: UserDbObject,
): Promise<SubDbObject | null> => {
  const sub = await getSubById(_id)

  if (!sub || String(sub.to) !== String(user._id)) return null

  return remove(sub, user)
}

export const remove = async (
  sub: SubDbObject,
  user: UserDbObject,
): Promise<SubDbObject & {deleted: boolean}> => {
  await SubModel.deleteOne({_id: sub._id})

  const deletedSub = {
    ...sub,
    deleted: true,
  }

  await EventService.deleteEvent(subRequested({sub: deletedSub, user}))
  await pubsub.publish('sub', {subUpdated: deletedSub})

  return deletedSub
}

export const getSubFromTo = async (
  from: User | UserDbObject,
  to: User | UserDbObject,
): Promise<SubDbObject | null> => SubModel.findOne({from: from._id, to: to._id})
