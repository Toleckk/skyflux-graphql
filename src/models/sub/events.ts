import {
  EventDbObject,
  EventType,
  SubDbObject,
  UserDbObject,
} from '@models/types'

export const subRequested = ({
  sub,
  user,
}: {
  sub: SubDbObject
  user: UserDbObject
}): Omit<EventDbObject, '_id' | 'createdAt'> => ({
  kind: EventType.Sub,
  channel: `Sub_${sub.to}`,
  subj: {sub: sub._id},
  emitter: user,
})
