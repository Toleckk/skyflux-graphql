import {ObjectID} from 'mongodb'
import {
  DeletedSub,
  EventDbObject,
  EventType,
  Sub,
  SubDbObject,
  UserDbObject,
} from '@skyflux/api/models/types'

export const subRequested = ({
  sub,
  user,
}: {
  sub: SubDbObject | Sub | DeletedSub
  user: UserDbObject
}): Omit<EventDbObject, '_id' | 'createdAt'> => ({
  kind: EventType.Sub,
  channel: `Sub_${'_id' in sub.to ? sub.to._id : sub.to}`,
  subj: {sub: sub._id as ObjectID},
  emitter: user,
})
