import {User} from '@models/user'
import {Event, EventType, LikeEventBody} from '@models/event'
import {LikeDocument} from './types'

export const likeCreated = ({
  like,
  user,
}: {
  like: LikeDocument
  user: User
}): Omit<Event<LikeEventBody>, '_id'> => ({
  channel: `Like_${like.post_id}`,
  kind: EventType.Like,
  subj: {like_id: like._id},
  emitter: user,
})
