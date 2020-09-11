import {Document, Types} from 'mongoose'
import {User} from '@models/user'

export interface Session {
  _id: Document['_id']
  user: User
  token: string
}

export interface SessionDocument extends Document, Omit<Session, 'user'> {
  user_id: Types.ObjectId | User
}
