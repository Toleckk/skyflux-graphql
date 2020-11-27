import {Document, Types} from 'mongoose'
import {Scalars, User} from '@skyflux/api/models/types'

export interface Email {
  _id: Scalars['ID']
  user: User
  token: string
  email: string
}

export interface EmailDocument extends Omit<Email, 'user' | '_id'>, Document {
  user: Types.ObjectId
}

export interface Mailer {
  sendMail: (mailOptions: {
    from?: string
    to: string
    subject?: string
    text?: string
    html?: string
  }) => Promise<any>
}
