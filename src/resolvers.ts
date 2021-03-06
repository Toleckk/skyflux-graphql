import {mergeResolvers} from 'graphql-tools'
import {UserResolver} from '@skyflux/api/models/user'
import {PostResolver} from '@skyflux/api/models/post'
import {LikeResolver} from '@skyflux/api/models/like'
import {CommentResolver} from '@skyflux/api/models/comment'
import {SubResolver} from '@skyflux/api/models/sub'
import {EventResolver} from '@skyflux/api/models/event'

export const resolvers = mergeResolvers([
  UserResolver,
  PostResolver,
  LikeResolver,
  CommentResolver,
  SubResolver,
  EventResolver,
])
