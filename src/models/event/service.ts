import Mongoose from 'mongoose'
import {EventDbObject, User, UserDbObject} from '@skyflux/api/models/types'
import {ChannelService} from '@skyflux/api/models/channel'

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
          {$match: {deleted: {$ne: true}}},
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
