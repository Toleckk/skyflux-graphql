import {Document, Types} from 'mongoose'
import {Scalars, User} from '@skyflux/api/models/types'

export interface Reset {
  _id: Scalars['ID']
  token: string
  user: User
}

export interface ResetDocument extends Omit<Reset, 'user' | '_id'>, Document {
  user: Types.ObjectId
}
