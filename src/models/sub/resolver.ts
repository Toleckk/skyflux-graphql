import {User, UserService} from '@models/user'
import {a, auth, injectArgs} from '@decorators'
import * as SubService from './service'
import {Sub, SubDocument} from './types'

export const SubResolver = {
  Mutation: {
    createSub: a([injectArgs(), auth()])(SubService.createSub),
    removeSub: a([injectArgs(), auth()])(SubService.removeSub),
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
