import {Document} from 'mongoose'
import {User} from '@models/user'
import {Entity, ID} from '@models/types'

export interface Sub extends Entity {
  from: User
  to: User
}

export interface SubDocument extends Omit<Sub, 'from' | 'to'>, Document {
  from_id: ID | User
  to_id: ID | User
}
