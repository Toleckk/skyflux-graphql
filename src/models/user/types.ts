import {Document} from 'mongoose'

export interface UserDescription {
  about?: string
  birthday?: string
  from?: string
}

export interface User extends Pick<Document, '_id'> {
  nickname: string
  email: string
  password: string
  avatar?: string
  description: UserDescription
}

export interface UserDocument extends Document, User {}
