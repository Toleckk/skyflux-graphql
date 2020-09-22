import {Document} from 'mongoose'
import {User} from '@models/user'
import {Entity, ID} from '@models/types'

export interface Reset extends Entity {
  token: string
  user: User
}

export interface ResetDocument extends Omit<Reset, 'user'>, Document {
  user_id: ID
}
