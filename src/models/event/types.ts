import {Document} from 'mongoose'
import {Entity, ID} from '@models/types'
import {Sub} from '@models/sub'
import {User} from '@models/user'
import {Like} from '@models/like'

export enum EventType {
  Sub = 'Sub',
  Comment = 'Comment',
  Like = 'Like',
}

export type EventBody = Record<string, any>

export interface SubEventBody extends EventBody {
  sub_id: ID | Sub
}

export interface CommentEventBody extends EventBody {
  comment_id: ID | Comment
}

export interface LikeEventBody extends EventBody {
  like_id: ID | Like
}

export type EventKind<T extends EventBody> = T extends SubEventBody
  ? EventType.Sub
  : T extends CommentEventBody
  ? EventType.Comment
  : T extends LikeEventBody
  ? EventType.Like
  : EventType

export interface Event<T extends EventBody = EventBody> extends Entity {
  channel: string
  createdAt?: Date
  kind: EventKind<T>
  subj: T
  emitter: User
}

export interface EventDocument<T extends EventBody = EventBody>
  extends Omit<Event<T>, 'emitter'>,
    Document {
  emitter_id: ID
}
