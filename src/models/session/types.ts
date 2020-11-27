import {Document, Types} from 'mongoose'
import {Scalars, User} from '@skyflux/api/models/types'

export interface Session {
  _id: Scalars['ID']
  user: User
  token: string
}

export interface SessionDocument
  extends Document,
    Omit<Session, 'user' | '_id'> {
  user: Types.ObjectId
}
