import {Aggregate} from 'mongoose'
import {User} from '@models/user'
import {Channel} from './types'
import {ChannelModel} from './model'

export const aggregateUserChannels = ({
  user,
  pipeline,
}: {
  user: User
  pipeline: any[]
}): Aggregate<any> =>
  ChannelModel.aggregate([{$match: {user_id: user._id}}, ...pipeline])

export const subscribeUserToChannel = async ({
  user,
  channel,
}: {
  user: User
  channel: string
}): Promise<Partial<Channel>> =>
  ChannelModel.create({user_id: user._id, channelRegex: channel})
