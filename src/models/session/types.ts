import {Document} from 'mongoose'
import {User} from '@models/user'
import {Entity, ID} from '@models/types'

export interface Session extends Entity {
  user: User
  token: string
}

export interface SessionDocument extends Document, Omit<Session, 'user'> {
  user_id: ID | User
}
