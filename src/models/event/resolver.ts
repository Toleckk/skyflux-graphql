import {withFilter} from 'apollo-server'
import {pubsub} from '@pubsub'
import {
  CommentEventBodyResolvers,
  EventBodyResolvers,
  LikeEventBodyResolvers,
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
    eventAdded: {
      subscribe: withFilter(
        (): AsyncIterator<Event> => pubsub.asyncIterator('event'),
        (root, _, {user}) =>
          String(root.eventAdded.emitter_id) !== String(user._id) &&
          ChannelService.isUserSubscribedToChannel(
            root.eventAdded.channel,
            user,
          ),
      ),
    },
    eventDeleted: {
      subscribe: withFilter(
        (): AsyncIterator<Event> => pubsub.asyncIterator('event'),
        (root, _, {user}) =>
          String(root.eventDeleted.emitter_id) !== String(user._id) &&
          ChannelService.isUserSubscribedToChannel(
            root.eventDeleted.channel,
            user,
          ),
      ),
    },
  },
}
