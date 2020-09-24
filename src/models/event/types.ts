import {Document} from 'mongoose'
import {Entity, ID} from '@models/types'
import {Sub} from '@models/sub'

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

export type EventKind<T extends EventBody> = T extends SubEventBody
  ? EventType.Sub
  : T extends CommentEventBody
  ? EventType.Comment
  : EventType

export interface Event<T extends EventBody = EventBody> extends Entity {
  channel: string
  createdAt?: Date
  kind: EventKind<T>
  subj: T
}

export type EventDocument<T extends EventBody = EventBody> = Event<T> & Document
