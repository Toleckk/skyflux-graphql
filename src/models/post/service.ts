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
