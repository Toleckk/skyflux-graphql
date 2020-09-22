import {IResolvers} from 'graphql-tools'
import {a, auth, injectArgs, injectToken} from '@decorators'
import * as SessionService from './service'

export const SessionResolver: IResolvers = {
  Mutation: {
    createSession: a([injectArgs()])(SessionService.createSession),
    removeCurrentSession: a([injectArgs(), injectToken(), auth()])(
      SessionService.removeByToken,
    ),
  },
}
