import {IResolvers} from 'graphql-tools'
import {a, auth, injectArgs, injectToken, validate} from '@decorators'
import * as SessionService from './service'

export const SessionResolver: IResolvers = {
  Mutation: {
    createSession: a([injectArgs(), validate()])(SessionService.createSession),
    removeCurrentSession: a([injectArgs(), injectToken(), auth(), validate()])(
      SessionService.removeByToken,
    ),
  },
}
