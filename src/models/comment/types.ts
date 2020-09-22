import {Document} from 'mongoose'
import {Entity, ID} from '@models/types'
import {User} from '../user'
import {Post} from '../post'

export interface Comment extends Entity {
  text: string
  user: User
  post: Post
}

export interface CommentDocument
  extends Omit<Comment, 'user' | 'post'>,
    Document {
  user_id: ID | User
  post_id: ID | Post
}
