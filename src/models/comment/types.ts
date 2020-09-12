import {Document} from 'mongoose'
import {User} from '../user'
import {Post} from '../post'

export interface Comment {
  _id: Document['_id']
  text: string
  user: User
  post: Post
}

export interface CommentDocument
  extends Omit<Comment, 'user' | 'post'>,
    Document {
  user_id: string | User
  post_id: string | Post
}
