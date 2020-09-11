import {Document} from 'mongoose'

export interface User extends Pick<Document, '_id'> {
  nickname: string
  email: string
  password: string
}

export interface UserDocument extends Document, User {}
