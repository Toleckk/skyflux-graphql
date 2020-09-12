import {Like} from './types'
import {LikeModel} from './model'

export const createLike = async ({
  post_id,
  user_id,
}: {
  post_id: string
  user_id: string
}): Promise<Partial<Like> | null> => {
  const like = await LikeModel.create({post_id, user_id})
  return like || null
}
