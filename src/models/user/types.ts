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
  private: boolean
}

export interface UserDocument extends Document, User {}
