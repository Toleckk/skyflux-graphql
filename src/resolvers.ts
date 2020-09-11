import {mergeResolvers} from 'graphql-tools'
import {UserResolver} from '@models/user'
import {SessionResolver} from '@models/session'
import {ResetResolver} from '@models/reset'

export const resolvers = mergeResolvers([
  UserResolver,
  SessionResolver,
  ResetResolver,
])
