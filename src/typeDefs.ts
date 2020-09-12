import {UserSchema} from '@models/user'
import {SessionSchema} from '@models/session'
import {ResetSchema} from '@models/reset'
import {PostSchema} from '@models/post'
import {LikeSchema} from '@models/like'
import {CommentSchema} from '@models/comment'

// language=GraphQL
const Schema = `
    scalar Date

    type Mutation
    type Query
`

export const typeDefs = [
  Schema,
  UserSchema,
  SessionSchema,
  ResetSchema,
  PostSchema,
  LikeSchema,
  CommentSchema,
]
