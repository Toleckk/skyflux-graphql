import {Document} from 'mongoose'
import {Entity, ID} from '@models/types'
import {User} from '@models/user'

export interface Email extends Entity {
  user: User
  token: string
  email: string
}

export interface EmailDocument extends Omit<Email, 'user'>, Document {
  user_id: ID
}
