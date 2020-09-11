import {IResolvers} from 'graphql-tools'
import {applySpec, nthArg, path, pipe, prop} from 'ramda'
import * as UserService from './service'

export const UserResolver: IResolvers = {
  Mutation: {
    createUser: pipe(nthArg(1), UserService.createUser),
    resetPassword: pipe(nthArg(1), UserService.resetPassword),
    updatePassword: pipe(
      applySpec({
        oldPassword: pipe(
          nthArg(1),
          prop<'oldPassword', string>('oldPassword'),
        ),
        newPassword: pipe(
          nthArg(1),
          prop<'newPassword', string>('newPassword'),
        ),
        user_id: pipe(nthArg(2), path(['user', '_id'])),
      }),
      UserService.updatePassword,
    ),
    updateNickname: pipe(
      applySpec({
        nickname: pipe(nthArg(1), prop<'nickname', string>('nickname')),
        user_id: pipe(nthArg(2), path(['user', '_id'])),
      }),
      UserService.updateNickname,
    ),
  },
  Query: {
    me: pipe(nthArg(2), prop('user')),
  },
}
