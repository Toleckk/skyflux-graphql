import {MutationResolvers, Resolvers} from '@models/types'
import * as SessionService from './service'

export const SessionResolver: Resolvers = {
  Mutation: <MutationResolvers>{
    createSession: (_, {credentials: {login, password}}) =>
      SessionService.createSession(login, password),
    deleteCurrentSession: (_, __, {token, user}) =>
      SessionService.deleteByToken(token, user),
  },
}
