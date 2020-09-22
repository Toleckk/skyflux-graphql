import {Document} from 'mongoose'
import {Entity, ID} from '@models/types'
import {Post} from '../post'
import {User} from '../user'

export interface Like extends Entity {
  post: Post
  user: User
}

export interface LikeDocument extends Omit<Like, 'user' | 'post'>, Document {
  user_id: ID | User
  post_id: ID | Post
}
