import {IResolvers} from 'graphql-tools'
import {withFilter} from 'apollo-server'
import {__, concat, pipe, prop} from 'ramda'
import {pubsub} from '@pubsub'
import {a, auth, injectArgs, injectRoot, paginate} from '@decorators'
import {CommentService} from '@models/comment'
import {LikeService} from '@models/like'
import {SubService} from '@models/sub'
import {ChannelService} from '@models/channel'
import * as EventService from './service'
import {Event} from './types'

export const EventResolver: IResolvers = {
  Query: {
    getEvents: a([injectArgs(), auth(), paginate()])(
      EventService.getEventsByUser,
    ),
  },
  Subscription: {
    eventAdded: {
      subscribe: withFilter(
        (): AsyncIterator<Event> => pubsub.asyncIterator('event'),
        a([injectRoot(), auth()])(
          ({root, user}) =>
            String(root.eventAdded.emitter_id) !== String(user._id) &&
            ChannelService.isUserSubscribedToChannel({
              user,
              channel: root.eventAdded.channel,
            }),
        ),
      ),
    },
    eventDeleted: {
      subscribe: withFilter(
        (): AsyncIterator<Event> => pubsub.asyncIterator('event'),
        a([injectRoot(), auth()])(
          ({root, user}) =>
            String(root.eventAdded.emitter_id) !== String(user._id) &&
            ChannelService.isUserSubscribedToChannel({
              user,
              channel: root.eventDeleted.channel,
            }),
        ),
      ),
    },
  },
  Event: {
    __resolveType: pipe(
      prop('kind') as (event: Event) => string,
      concat(__, 'Event'),
    ),
  },
  CommentEventBody: {
    comment: a([injectRoot()])(({root}): any =>
      CommentService.resolveComment({root}),
    ),
  },
  SubEventBody: {
    sub: a([injectRoot()])(({root}): any => SubService.resolveSub({root})),
  },
  LikeEventBody: {
    like: a([injectRoot()])(({root}): any => LikeService.resolveLike({root})),
  },
}
