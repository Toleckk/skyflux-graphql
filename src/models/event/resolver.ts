import {withFilter} from 'apollo-server'
import {pubsub} from '@pubsub'
import {
  CommentEventBodyResolvers,
  EventBodyResolvers,
  LikeEventBodyResolvers,
  MaybeEventResolvers,
  QueryResolvers,
  Resolvers,
  SubEventBodyResolvers,
  SubscriptionResolvers,
} from '@models/types'
import {CommentService} from '@models/comment'
import {LikeService} from '@models/like'
import {SubService} from '@models/sub'
import {ChannelService} from '@models/channel'
import {paginate} from '@utils/paginate'
import * as EventService from './service'

export const EventResolver: Resolvers = {
  MaybeEvent: <MaybeEventResolvers>{
    __resolveType: parent => ('deleted' in parent ? 'DeletedEvent' : 'Event'),
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
        (root, _, {user}) =>
          root.eventUpdated &&
          String(root.eventUpdated.emitter) !== String(user._id) &&
          ChannelService.isUserSubscribedToChannel(
            root.eventUpdated.channel,
            user,
          ),
      ),
    },
  },
}
