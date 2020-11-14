import {
  CommentDbObject,
  EventDbObject,
  EventType,
  UserDbObject,
} from '@models/types'

export const commentCreated = ({
  comment,
  user,
}: {
  comment: CommentDbObject
  user: UserDbObject
}): Omit<EventDbObject, '_id' | 'createdAt'> => ({
  channel: `Comment_${comment.post}`,
  kind: EventType.Comment,
  subj: {comment: comment._id},
  emitter: user._id,
})
