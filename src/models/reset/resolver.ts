import {IResolvers} from 'graphql-tools'
import {nthArg, pipe, prop} from 'ramda'
import * as ResetService from './service'

export const ResetResolver: IResolvers = {
  Mutation: {
    createResetRequest: pipe(
      nthArg(1),
      prop('login'),
      ResetService.createResetRequest,
    ),
  },
}
