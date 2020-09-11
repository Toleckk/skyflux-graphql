import {Document} from 'mongoose'
import {User} from '@models/user'

export interface Reset extends Pick<Document, '_id'> {
  token: string
  user: User
}

export interface ResetDocument extends Omit<Reset, 'user'>, Document {
  user_id: User['_id']
}
