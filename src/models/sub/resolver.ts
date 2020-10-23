import {withFilter} from 'apollo-server'
import {pubsub} from '@pubsub'
import {a, auth, injectArgs, injectRoot, paginate} from '@decorators'
import {UserService} from '@models/user'
import {Sub} from '@models/sub'
import * as SubService from './service'

const createSubscribeFn = (name: string) =>
  withFilter(
    (): AsyncIterator<Sub> => pubsub.asyncIterator('sub'),
    a([auth(), injectRoot()])(
      ({root, user}) =>
        String(root[name]?.to?._id || root[name]?.to_id) === String(user._id) ||
        String(root[name]?.from?._id || root[name]?.from_id) ===
          String(user._id),
    ),
  )

export const SubResolver = {
  Mutation: {
    createSub: a([injectArgs(), auth()])(SubService.createSub),
    deleteSub: a([injectArgs(), auth()])(SubService.deleteSub),
    acceptSub: a([injectArgs(), auth()])(SubService.acceptSub),
  },
  Subscription: {
    subAccepted: {
      subscribe: createSubscribeFn('subAccepted'),
    },
    subRequestCreated: {
      subscribe: createSubscribeFn('subRequestCreated'),
    },
    subDeleted: {
      subscribe: createSubscribeFn('subDeleted'),
    },
  },
  Query: {
    getSubRequests: a([injectArgs(), auth(), paginate()])(
      SubService.getSubRequests,
    ),
    getSubRequestsCount: a([auth()])(SubService.countSubRequests),
  },
  Sub: {
    from: a([injectRoot()])(({root}) =>
      UserService.resolveUser({root: {user_id: root.from_id || root.from}}),
    ),
    to: a([injectRoot()])(({root}) =>
      UserService.resolveUser({root: {user_id: root.to_id || root.to}}),
    ),
  },
  DeletedSub: {
    from: a([injectRoot()])(({root}) =>
      UserService.resolveUser({root: {user_id: root.from_id || root.from}}),
    ),
    to: a([injectRoot()])(({root}) =>
      UserService.resolveUser({root: {user_id: root.to_id || root.to}}),
    ),
  },
}
