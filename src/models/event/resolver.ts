import {IResolvers} from 'graphql-tools'
import {withFilter} from 'apollo-server'
import {__, assoc, concat, converge, identity, path, pipe, prop} from 'ramda'
import {pubsub} from '@pubsub'
import {a, auth, injectArgs, injectRoot, paginate} from '@decorators'
import {CommentService} from '@models/comment'
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
          pipe(
            converge(assoc('channel'), [
              path(['root', 'eventAdded', 'channel']),
              identity,
            ]),
            ChannelService.isUserSubscribedToChannel,
          ),
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
    sub: a([injectRoot()])(SubService.resolveSub),
  },
}
