import {CommentEventBody, Event, EventType} from '@models/event'
import {CommentDocument} from './types'

export const commentCreated = ({
  comment,
}: {
  comment: CommentDocument
}): Omit<Event<CommentEventBody>, '_id'> => ({
  channel: `Comment_${comment.post_id}`,
  kind: EventType.Comment,
  subj: {comment_id: comment._id},
})
