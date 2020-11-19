import {
  Comment,
  CommentDbObject,
  EventDbObject,
  EventType,
  UserDbObject,
} from '@models/types'
import {ObjectID} from 'mongodb'

export const commentCreated = ({
  comment,
  user,
}: {
  comment: CommentDbObject | Comment
  user: UserDbObject
}): Omit<EventDbObject, '_id' | 'createdAt'> => ({
  channel: `Comment_${'_id' in comment.post ? comment.post._id : comment.post}`,
  kind: EventType.Comment,
  subj: {comment: comment._id as ObjectID},
  emitter: user._id,
})
