import {mergeResolvers} from 'graphql-tools'
import {UserResolver} from '@models/user'
import {SessionResolver} from '@models/session'
import {ResetResolver} from '@models/reset'
import {PostResolver} from '@models/post'

export const resolvers = mergeResolvers([
  UserResolver,
  SessionResolver,
  ResetResolver,
  PostResolver,
])
