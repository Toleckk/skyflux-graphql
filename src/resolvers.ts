import {mergeResolvers} from 'graphql-tools'
import {UserResolver} from '@models/user'
import {SessionResolver} from '@models/session'

export const resolvers = mergeResolvers([UserResolver, SessionResolver])
