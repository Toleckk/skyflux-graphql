import {mergeResolvers} from 'graphql-tools'
import {UserResolver} from '@models/user'

export const resolvers = mergeResolvers([UserResolver])
