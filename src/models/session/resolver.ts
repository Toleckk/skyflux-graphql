import {IResolvers} from 'graphql-tools'
import {nthArg, pipe} from 'ramda'
import * as SessionService from './service'

export const SessionResolver: IResolvers = {
  Mutation: {
    createSession: pipe(nthArg(1), SessionService.createSession),
  },
}
