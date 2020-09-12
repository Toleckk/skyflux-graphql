import {mergeResolvers} from 'graphql-tools'
import {UserResolver} from '@models/user'
import {SessionResolver} from '@models/session'
import {ResetResolver} from '@models/reset'
import {PostResolver} from '@models/post'
import {LikeResolver} from '@models/like'
import {CommentResolver} from '@models/comment'
import {SubResolver} from '@models/sub'

export const resolvers = mergeResolvers([
  UserResolver,
  SessionResolver,
  ResetResolver,
  PostResolver,
  LikeResolver,
  CommentResolver,
  SubResolver,
])
