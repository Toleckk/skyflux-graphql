import {MutationResolvers, Resolvers} from '@skyflux/api/models/types'
import * as ResetService from './service'

export const ResetResolver: Resolvers = {
  Mutation: <MutationResolvers>{
    createResetRequest: (_, {login}) => ResetService.createResetRequest(login),
  },
}
