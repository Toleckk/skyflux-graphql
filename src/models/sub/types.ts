import {Document} from 'mongoose'
import {User} from '@models/user'

export interface Sub {
  _id: Document['_id']
  from: User
  to: User
}

export interface SubDocument extends Omit<Sub, 'from' | 'to'>, Document {
  from_id: Document['_id'] | User
  to_id: Document['_id'] | User
}
