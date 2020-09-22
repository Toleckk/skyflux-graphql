import {Document} from 'mongoose'
import {Entity} from '@models/types'

export interface UserDescription {
  about?: string
  birthday?: string
  from?: string
}

export interface User extends Entity {
  nickname: string
  email: string
  password: string
  avatar?: string
  description: UserDescription
}

export interface UserDocument extends Document, User {}
