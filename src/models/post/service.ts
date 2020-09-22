import Mongoose from 'mongoose'
import {isMongoId} from '@utils/isMongoId'
import {User} from '../user'
import {Post} from './types'
import {PostModel} from './model'

export const createPost = async ({
  text,
  user,
}: {
  text: string
  user: User
}): Promise<Post | null> => {
  const post = await PostModel.create({text, user_id: user._id})

  return {
    ...post.toObject(),
    user,
  }
}

export const deletePost = async ({
  _id,
  user,
}: {
  _id: string
  user: User
}): Promise<boolean> => {
  const deleted = await PostModel.deleteOne({_id, user_id: user._id})
  return (deleted.deletedCount || 0) > 0
}

export const getPostById = async ({
  _id,
}: {
  _id: string | Mongoose.Types.ObjectId
}): Promise<Partial<Post> | null> => {
  const post = await PostModel.findById(_id)
  return post || null
}

export const resolvePost = ({
  root,
}: {
  root:
    | {post: Partial<Post>}
    | {post_id: Partial<Post> | string | Mongoose.Types.ObjectId}
}): Promise<Partial<Post> | null> | Partial<Post> => {
  if ('post' in root) return root.post

  if (typeof root.post_id === 'string' || isMongoId(root.post_id))
    return getPostById({_id: root.post_id})

  return root.post_id
}
