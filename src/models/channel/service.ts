import {Aggregate} from 'mongoose'
import {User, UserDbObject} from '@skyflux/api/models/types'
import {EventService} from '@skyflux/api/models/event'
import {ChannelDocument} from './types'
import {ChannelModel} from './model'

export const aggregateUserChannels = <T extends any = any>(
  user: User | UserDbObject,
  pipeline: any[] = [],
): Aggregate<T[]> =>
  ChannelModel.aggregate([{$match: {user: user._id}}, ...pipeline])

export const subscribeUserToChannel = async (
  user: User | UserDbObject,
  channel: string,
): Promise<ChannelDocument> =>
  ChannelModel.create({user: user._id, channelRegex: channel})

export const isUserSubscribedToChannel = async (
  channel: string,
  user: User | UserDbObject,
): Promise<boolean> => {
  const [{count}] = await aggregateUserChannels<{count: number}>(user, [
    {
      $match: {
        $expr: {
          $regexMatch: {
            regex: '$channelRegex',
            input: channel,
          },
        },
      },
    },
    {$limit: 1},
    {$count: 'count'},
  ])

  return count > 0
}

export const deleteChannel = async (channel: string): Promise<void> => {
  await ChannelModel.deleteMany({channelRegex: channel})
  await EventService.deleteEventsByChannel(channel)
}
