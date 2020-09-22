import {IResolvers} from 'graphql-tools'
import {a, injectArgs} from '@decorators'
import * as ResetService from './service'

export const ResetResolver: IResolvers = {
  Mutation: {
    createResetRequest: a([injectArgs()])(ResetService.createResetRequest),
  },
}
