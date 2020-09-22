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
  _id: string
}): Promise<Partial<Post> | null> => {
  return PostModel.findById(_id) || null
}
