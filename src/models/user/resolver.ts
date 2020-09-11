import {IResolvers} from 'graphql-tools'
import {nthArg, pipe, prop} from 'ramda'
import * as UserService from './service'

export const UserResolver: IResolvers = {
  Mutation: {
    createUser: pipe(nthArg(1), UserService.createUser),
    resetPassword: pipe(nthArg(1), UserService.resetPassword),
  },
  Query: {
    me: pipe(nthArg(2), prop('user')),
  },
}
