import Mongoose, {Types} from 'mongoose'
import {EventDbObject, User, UserDbObject} from '@skyflux/api/models/types'
import {ChannelService} from '@skyflux/api/models/channel'
import {EventModel} from '@skyflux/api/models/event/model'
import {notifyEventChanged} from '@skyflux/api/models/event/subscriptions'

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

  notifyEventChanged(event)

  return event
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

  notifyEventChanged(deletedEvent)

  return event._id
}
