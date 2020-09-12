import {UserModel} from '../user'
import {Post} from './types'
import {PostModel} from './model'

export const createPost = async ({
  text,
  user_id,
}: {
  text: string
  user_id: string
}): Promise<Post | null> => {
  const user = await UserModel.findById(user_id)

  if (!user) return null

  const post = await PostModel.create({text, user_id})

  return {
    ...post.toObject(),
    user,
  }
}

export const deletePost = async ({
  _id,
  user_id,
}: {
  _id: string
  user_id: string
}): Promise<boolean> => {
  const deleted = await PostModel.deleteOne({_id, user_id})
  return (deleted.deletedCount || 0) > 0
}

export const getPostById = async ({
  _id,
}: {
  _id: string
}): Promise<Partial<Post> | null> => {
  return PostModel.findById(_id) || null
}
