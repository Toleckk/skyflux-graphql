import {applySpec, nthArg, path, pipe, prop} from 'ramda'
import {User, UserService} from '@models/user'
import {Sub, SubDocument} from './types'
import * as SubService from './service'

export const SubResolver = {
  Mutation: {
    createSub: pipe(
      applySpec({
        nickname: pipe(nthArg(1), prop<'nickname', string>('nickname')),
        user_id: pipe(nthArg(2), path(['user', '_id'])),
      }),
      SubService.createSub,
    ),
    removeSub: pipe(
      applySpec({
        nickname: pipe(nthArg(1), prop<'nickname', string>('nickname')),
        user_id: pipe(nthArg(2), path(['user', '_id'])),
      }),
      SubService.removeSub,
    ),
  },
  Sub: {
    from: (root: Sub | SubDocument): Promise<User | null> | User => {
      if ('from' in root) return root.from

      return UserService.getUserById({_id: root.from_id})
    },
    to: (root: Sub | SubDocument): Promise<User | null> | User => {
      if ('to' in root) return root.to

      return UserService.getUserById({_id: root.to_id})
    },
  },
}
