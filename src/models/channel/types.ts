import {Document} from 'mongoose'
import {Entity, ID} from '@models/types'
import {User} from '@models/user'

export interface Channel extends Entity {
  user: User
  channelRegex: string
  createdAt?: Date
}

export interface ChannelDocument extends Omit<Channel, 'user'>, Document {
  user_id: ID | User
}
