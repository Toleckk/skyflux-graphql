import {IResolvers} from 'graphql-tools'
import {nthArg, pipe, prop} from 'ramda'

export const UserResolver: IResolvers = {
  Query: {
    me: pipe(nthArg(2), prop('user')),
  },
}
