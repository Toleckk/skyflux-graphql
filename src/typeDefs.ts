import {UserSchema} from '@models/user'
import {SessionSchema} from '@models/session'
import {ResetSchema} from '@models/reset'
import {PostSchema} from '@models/post'
import {LikeSchema} from '@models/like'
import {CommentSchema} from '@models/comment'
import {SubSchema} from '@models/sub'
import {EventSchema} from '@models/event'

// language=GraphQL
const Schema = `
    scalar Date

    type Mutation
    type Query
    type Subscription

    interface Edge {
        cursor: ID!
    }

    type PageInfo {
        startCursor: ID
        endCursor: ID
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
    }

    interface Connection {
        edges: [Edge]!
        pageInfo: PageInfo!
    }
`

export const typeDefs = [
  Schema,
  UserSchema,
  SessionSchema,
  ResetSchema,
  PostSchema,
  LikeSchema,
  CommentSchema,
  SubSchema,
  EventSchema,
]
