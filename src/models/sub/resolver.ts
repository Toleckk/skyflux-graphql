import {withFilter} from 'apollo-server'
import {pubsub} from '@pubsub'
import {UserService} from '@models/user'
import {
  DeletedSubResolvers,
  MutationResolvers,
  QueryResolvers,
  Resolvers,
  SubResolvers,
  SubscriptionResolvers,
} from '@models/types'
import {paginate} from '@utils/paginate'
import * as SubService from './service'

const createSubscribeFn = (name: string) =>
  withFilter(
    () => pubsub.asyncIterator('sub'),
    (root, _, {user}) =>
      String(root[name]?.to?._id || root[name]?.to_id) === String(user._id) ||
      String(root[name]?.from?._id || root[name]?.from_id) === String(user._id),
  )

export const SubResolver: Resolvers = {
  Sub: <SubResolvers>{
    from: root => UserService.resolveUser({user: root.from}),
    to: root => UserService.resolveUser({user: root.to}),
  },
  DeletedSub: <DeletedSubResolvers>{
    from: root => UserService.resolveUser({user: root.from}),
    to: root => UserService.resolveUser({user: root.to}),
  },
  Query: <QueryResolvers>{
    getSubRequests: (_, {first, after}, {user}) =>
      paginate((first, after) => SubService.getSubRequests(user, first, after))(
        first,
        after,
      ),
    getSubRequestsCount: (_, __, {user}) => SubService.countSubRequests(user),
  },
  Mutation: <MutationResolvers>{
    createSub: (_, {nickname}, {user}) => SubService.createSub(nickname, user),
    deleteSub: (_, {nickname}, {user}) => SubService.deleteSub(nickname, user),
    acceptSub: (_, {_id}, {user}) => SubService.acceptSub(_id, user),
    declineSub: (_, {_id}, {user}) => SubService.declineSub(_id, user),
  },
  Subscription: <SubscriptionResolvers>{
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
}
