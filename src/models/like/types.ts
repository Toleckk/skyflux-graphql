import {Document} from 'mongoose'
import {Post} from '../post'
import {User} from '../user'

export interface Like {
  _id: Document['_id']
  post: Post
  user: User
}

export interface LikeDocument extends Omit<Like, 'user' | 'post'>, Document {
  user_id: Document['_id'] | User
  post_id: Document['_id'] | Post
}
