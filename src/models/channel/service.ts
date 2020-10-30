import {Aggregate} from 'mongoose'
import {User} from '@models/user'
import {EventService} from '@models/event'
import {Channel} from './types'
import {ChannelModel} from './model'

export const aggregateUserChannels = <T extends any = any>({
  user,
  pipeline = [],
}: {
  user: User
  pipeline?: any[]
}): Aggregate<T[]> =>
  ChannelModel.aggregate([{$match: {user_id: user._id}}, ...pipeline])

export const subscribeUserToChannel = async ({
  user,
  channel,
}: {
  user: User
  channel: string
}): Promise<Partial<Channel>> =>
  ChannelModel.create({user_id: user._id, channelRegex: channel})

export const isUserSubscribedToChannel = async ({
  user,
  channel,
}: {
  user: User
  channel: string
}): Promise<boolean> => {
  const [{count}] = await aggregateUserChannels<{count: number}>({
    user,
    pipeline: [
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
    ],
  })

  return count > 0
}

export const deleteChannel = async ({
  channel,
}: {
  channel: string
}): Promise<void> => {
  await ChannelModel.deleteMany({channelRegex: channel})
  await EventService.deleteEventsByChannel({channel})
}
