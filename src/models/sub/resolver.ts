import {withFilter} from 'apollo-server'
import {pubsub} from '@skyflux/api/pubsub'
import {UserService} from '@skyflux/api/models/user'
import {
  DeletedSubResolvers,
  MaybeSubResolvers,
  MutationResolvers,
  QueryResolvers,
  Resolvers,
  SubResolvers,
  SubscriptionResolvers,
} from '@skyflux/api/models/types'
import {paginate} from '@skyflux/api/utils/paginate'
import * as SubService from './service'
import {filterSubsUpdated} from './subscriptions'

export const SubResolver: Resolvers = {
  Sub: <SubResolvers>{
    from: root => UserService.resolveUser({user: root.from}),
    to: root => UserService.resolveUser({user: root.to}),
  },
  DeletedSub: <DeletedSubResolvers>{
    from: root => UserService.resolveUser({user: root.from}),
    to: root => UserService.resolveUser({user: root.to}),
  },
  MaybeSub: <MaybeSubResolvers>{
    __resolveType: sub => ('deleted' in sub ? 'DeletedSub' : 'Sub'),
  },
  Query: <QueryResolvers>{
    subRequests: (_, {first, after}, {user}) =>
      paginate((first, after) => SubService.getSubRequests(user, first, after))(
        first,
        after,
      ),
    subRequestsCount: (_, __, {user}) => SubService.countSubRequests(user),
  },
  Mutation: <MutationResolvers>{
    createSub: (_, {nickname}, {user}) => SubService.createSub(nickname, user),
    deleteSub: (_, {nickname}, {user}) => SubService.deleteSub(nickname, user),
    acceptSub: (_, {_id}, {user}) => SubService.acceptSub(_id, user),
    declineSub: (_, {_id}, {user}) => SubService.declineSub(_id, user),
  },
  Subscription: <SubscriptionResolvers>{
    subsUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('sub'),
        filterSubsUpdated,
      ),
    },
  },
}
