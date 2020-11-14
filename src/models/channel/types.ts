import {Types} from 'mongoose'
import {Scalars, User} from '@models/types'

export interface Channel {
  _id: Scalars['ID']
  user: User
  channelRegex: string
  createdAt?: Date
}

export interface ChannelDocument extends Omit<Channel, 'user' | '_id'> {
  user: Types.ObjectId
}
