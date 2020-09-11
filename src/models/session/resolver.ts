import {IResolvers} from 'graphql-tools'
import {applySpec, nthArg, pathOr, pipe, prop} from 'ramda'
import * as SessionService from './service'

export const SessionResolver: IResolvers = {
  Mutation: {
    createSession: pipe(nthArg(1), SessionService.createSession),
    removeCurrentSession: pipe(
      nthArg(2),
      applySpec({
        token: prop<'token', {token?: string}>('token'),
        user_id: pathOr(undefined, ['user', '_id']),
      }),
      SessionService.removeByToken,
    ),
  },
}
