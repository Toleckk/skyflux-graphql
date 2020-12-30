import Mongoose from 'mongoose'
import {UserService} from '@skyflux/api/models/user'
import {isMongoId} from '@skyflux/api/utils/isMongoId'
import {
  Scalars,
  Sub,
  SubDbObject,
  User,
  UserDbObject,
} from '@skyflux/api/models/types'
import {SubModel} from './model'

export const createSub = async (
  nickname: string,
  user: UserDbObject,
): Promise<
  | null
  | (Omit<SubDbObject, 'to' | 'from'> & {
      to: Partial<User>
      from: Partial<User>
    })
> => {
  if (user.nickname === nickname) return null

  const to = await UserService.getUserByNickname(nickname)

  if (!to) return null

  const subDocument = await SubModel.create({
    from: user._id,
    to: to._id,
    accepted: !to.private,
  } as any)

  return {
    ...subDocument.toObject(),
    to,
    from: user,
  }
}

export const getSubById = async (
  _id: string | Mongoose.Types.ObjectId,
): Promise<SubDbObject | null | undefined> => {
  const sub = await SubModel.findOne({_id})
  return sub?.toObject()
}

export const resolveSub = async (root: {
  sub: Sub | SubDbObject | Mongoose.Types.ObjectId | string
}): Promise<Sub | SubDbObject | null | undefined> => {
  if (typeof root.sub === 'string' || isMongoId(root.sub))
    return getSubById(root.sub)

  return root.sub
}

export const acceptSub = async (
  _id: Scalars['ID'],
  user: UserDbObject,
): Promise<(Omit<SubDbObject, 'to'> & {to: Partial<User>}) | null> => {
  const subDocument = await SubModel.findOne({_id, to: user._id})

  if (!subDocument) return null

  subDocument.accepted = true
  await subDocument.save()

  return {
    ...subDocument.toObject(),
    to: user,
  }
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
    deleted: false,
  })
}

export const countSubs = async (user: User): Promise<number> =>
  SubModel.countDocuments({from: user._id, accepted: true})

export const countSubscribers = async (user: User): Promise<number> =>
  SubModel.countDocuments({to: user._id, accepted: true})

export const countSubRequests = async (user: UserDbObject): Promise<number> =>
  user.private ? SubModel.countDocuments({to: user._id, accepted: false}) : 0

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

export const getSubFromTo = async (
  from: User | UserDbObject,
  to: User | UserDbObject,
): Promise<SubDbObject | null> => SubModel.findOne({from: from._id, to: to._id})

export const deleteSub = async (
  nickname: string,
  user: UserDbObject,
): Promise<
  | (Omit<SubDbObject, 'to' | 'from'> & {
      to: Partial<User>
      from: Partial<User>
      deleted: boolean
    })
  | null
> => {
  const to = await UserService.getUserByNickname(nickname)

  if (!to) return null

  const sub = await SubModel.findOne({from: user._id, to: to._id})

  if (!sub) return null

  const removingSub = {...sub.toObject(), to, from: user, _id: sub._id}

  return remove(removingSub)
}

export const declineSub = async (
  _id: Scalars['ID'],
  user: UserDbObject,
): Promise<SubDbObject | null> => {
  const sub = await getSubById(_id)

  if (!sub || String(sub.to) !== String(user._id)) return null

  return remove(sub)
}

export const remove = async <T extends {_id: any}>(
  sub: T,
): Promise<T & {deleted: boolean}> => {
  await SubModel.deleteById(sub._id)

  return {
    ...sub,
    deleted: true,
  }
}
