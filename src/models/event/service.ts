import Mongoose from 'mongoose'
import {pubsub} from '@pubsub'
import {ID} from '@models/types'
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
                  $and: [
                    {$lt: [{$cmp: ['$$date', '$createdAt']}, 1]},
                    {$ne: ['$emitter_id', user._id]},
                  ],
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
  emitter,
}: {
  channel: string
  subj: T
  kind: EventKind<T>
  emitter: User
}): Promise<Partial<Event<T>>> => {
  const event = await EventModel.create({
    channel,
    subj,
    kind,
    emitter_id: emitter._id,
  })

  await pubsub.publish('event', {eventAdded: event})

  return event as any
}

export const deleteEvent = async <T extends EventBody>({
  channel,
  subj,
  kind,
}: {
  channel: string
  subj: T
  kind: EventKind<T>
}): Promise<ID | null> => {
  const event = await EventModel.findOne({channel, subj, kind})

  if (!event) return null

  await pubsub.publish('event', {eventDeleted: event})
  await event.deleteOne()

  return event._id
}
