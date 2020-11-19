import {ObjectID} from 'mongodb'
import {
  EventDbObject,
  EventType,
  Like,
  LikeDbObject,
  UserDbObject,
} from '@models/types'

export const likeCreated = ({
  like,
  user,
}: {
  like: LikeDbObject | Like
  user: UserDbObject
}): Omit<EventDbObject, '_id' | 'createdAt'> => ({
  channel: `Like_${'_id' in like.post ? like.post._id : like.post}`,
  kind: EventType.Like,
  subj: {like: like._id as ObjectID},
  emitter: user._id,
})
