import {CommentEventBody, Event, EventType} from '@models/event'
import {User} from '@models/user'
import {CommentDocument} from './types'

export const commentCreated = ({
  comment,
  user,
}: {
  comment: CommentDocument
  user: User
}): Omit<Event<CommentEventBody>, '_id'> => ({
  channel: `Comment_${comment.post_id}`,
  kind: EventType.Comment,
  subj: {comment_id: comment._id},
  emitter: user,
})
