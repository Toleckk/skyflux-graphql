import {Document} from 'mongoose'
import {Entity, ID} from '@models/types'
import {User} from '../user'

export interface Post extends Entity {
  text: string
  user: User
  createdAt?: Date
}

export interface PostDocument extends Omit<Post, 'user'>, Document {
  user_id: ID | User
}
