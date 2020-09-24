import Mongoose from 'mongoose'
import {pubsub} from '@pubsub'
import {User} from '@models/user'
import {ChannelService} from '@models/channel'
import {EventModel} from '@models/event/model'
import {Event, EventBody, EventKind} from './types'

export const getEventsByUser = async ({
  user,
  first = 25,
  after = 'ffffffffffffffffffffffff',
}: {
  user: User
  first?: number
  after?: string
}): Promise<Event[]> =>
  ChannelService.aggregateUserChannels({
    user,
    pipeline: [
      {
        $lookup: {
          from: 'events',
          let: {c: '$channelRegex', date: '$createdAt'},
          as: 'events',
          pipeline: [
            {
              $match: {
                $expr: {
                  $regexMatch: {
                    input: '$channel',
                    regex: '$$c',
                  },
                },
              },
            },
            {
              $match: {
                $expr: {
                  $lt: [{$cmp: ['$$date', '$createdAt']}, 1],
                },
              },
            },
            {$sort: {_id: -1}},
            {$limit: first + 1},
          ],
        },
      },
      {$unwind: {path: '$events'}},
      {$replaceRoot: {newRoot: '$events'}},
      {$sort: {createdAt: -1}},
      {$match: {_id: {$lt: Mongoose.Types.ObjectId(after)}}},
      {$limit: first + 1},
    ],
  })

export const createEvent = async <T extends EventBody>({
  channel,
  subj,
  kind,
}: {
  channel: string
  subj: T
  kind: EventKind<T>
}): Promise<Partial<Event<T>>> => {
  const event = await EventModel.create({
    channel,
    subj,
    kind,
  })

  await pubsub.publish('event', {eventAdded: event})

  return event as any
}
