import Mongoose, {Types} from 'mongoose'
import {pubsub} from '@pubsub'
import {EventDbObject, User, UserDbObject} from '@models/types'
import {ChannelService} from '@models/channel'
import {EventModel} from '@models/event/model'

export const getEventsByUser = async (
  user: User | UserDbObject,
  first = 25,
  after = 'ffffffffffffffffffffffff',
): Promise<EventDbObject[]> =>
  ChannelService.aggregateUserChannels(user, [
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
                  {$ne: ['$emitter', user._id]},
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
  ])

export const createEvent = async ({
  channel,
  subj,
  kind,
  emitter,
}: Omit<EventDbObject, 'createdAt' | '_id'>): Promise<EventDbObject> => {
  const event = await EventModel.create<Omit<EventDbObject, 'createdAt'>>({
    channel,
    subj,
    kind,
    emitter,
  })

  await pubsub.publish('event', {eventUpdated: event})

  return event as any
}

export const deleteEvent = async ({
  channel,
  subj,
  kind,
}: Omit<
  EventDbObject,
  'createdAt' | '_id'
>): Promise<Types.ObjectId | null> => {
  const event = await EventModel.findOne({channel, subj, kind})

  if (!event) return null

  await event.deleteOne()

  const deletedEvent = {
    ...event.toObject(),
    deleted: true,
  }

  await pubsub.publish('event', {eventUpdated: deletedEvent})

  return event._id
}

export const deleteEventsByChannel = async (channel: string): Promise<void> =>
  void (await EventModel.deleteMany({channel}))
