import {
  EventDbObject,
  EventType,
  LikeDbObject,
  UserDbObject,
} from '@models/types'

export const likeCreated = ({
  like,
  user,
}: {
  like: LikeDbObject
  user: UserDbObject
}): Omit<EventDbObject, '_id' | 'createdAt'> => ({
  channel: `Like_${like.post}`,
  kind: EventType.Like,
  subj: {like: like._id},
  emitter: user,
})
