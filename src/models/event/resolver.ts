import {withFilter} from 'apollo-server'
import {pubsub} from '@skyflux/api/pubsub'
import {
  CommentEventBodyResolvers,
  EventBodyResolvers,
  LikeEventBodyResolvers,
  MaybeEventResolvers,
  QueryResolvers,
  Resolvers,
  SubEventBodyResolvers,
  SubscriptionResolvers,
} from '@skyflux/api/models/types'
import {CommentService} from '@skyflux/api/models/comment'
import {LikeService} from '@skyflux/api/models/like'
import {SubService} from '@skyflux/api/models/sub'
import {paginate} from '@skyflux/api/utils/paginate'
import * as EventService from './service'
import {filterEventUpdated} from './subscriptions'

export const EventResolver: Resolvers = {
  MaybeEvent: <MaybeEventResolvers>{
    __resolveType: parent =>
      'deleted' in parent && parent.deleted ? 'DeletedEvent' : 'Event',
  },
  EventBody: <EventBodyResolvers>{
    __resolveType: root =>
      'sub' in root
        ? 'SubEventBody'
        : 'comment' in root
        ? 'CommentEventBody'
        : 'LikeEventBody',
  },
  CommentEventBody: <CommentEventBodyResolvers>{
    comment: root => CommentService.resolveComment(root),
  },
  SubEventBody: <SubEventBodyResolvers>{
    sub: root => SubService.resolveSub(root),
  },
  LikeEventBody: <LikeEventBodyResolvers>{
    like: root => LikeService.resolveLike(root),
  },
  Query: <QueryResolvers>{
    events: (_, {first, after}, {user}) =>
      paginate((first, after) =>
        EventService.getEventsByUser(user, first, after),
      )(first, after),
  },
  Subscription: <SubscriptionResolvers>{
    eventUpdated: {
      subscribe: withFilter(
        (): AsyncIterator<Event> => pubsub.asyncIterator('event'),
        filterEventUpdated,
      ),
    },
  },
}
