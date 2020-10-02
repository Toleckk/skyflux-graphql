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

export interface Mailer {
  sendMail: (mailOptions: {
    from?: string
    to: string
    subject?: string
    text?: string
    html?: string
  }) => Promise<any>
}
