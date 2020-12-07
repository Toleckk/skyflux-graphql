import {Aggregate} from 'mongoose'
import {User, UserDbObject} from '@skyflux/api/models/types'
import {ChannelModel} from './model'

export const aggregateUserChannels = <T extends any = any>(
  user: User | UserDbObject,
  pipeline: any[] = [],
): Aggregate<T[]> =>
  ChannelModel.aggregate([{$match: {user: user._id}}, ...pipeline])

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
