import {Document} from 'mongoose'
import {User} from '../user'

export interface Post {
  _id: Document['_id']
  text: string
  user: User
}

export interface PostDocument extends Omit<Post, 'user'>, Document {
  user_id: Document['_id'] | User
}
