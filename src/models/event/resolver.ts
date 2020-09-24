import {IResolvers} from 'graphql-tools'
import {__, concat, pipe, prop} from 'ramda'
import {a, auth, injectArgs, injectRoot, paginate} from '@decorators'
import {CommentService} from '@models/comment'
import {SubService} from '@models/sub'
import * as EventService from './service'
import {Event} from './types'

export const EventResolver: IResolvers = {
  Query: {
    getEvents: a([injectArgs(), auth(), paginate()])(
      EventService.getEventsByUser,
    ),
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
