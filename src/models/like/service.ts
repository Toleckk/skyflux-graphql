import {Like} from './types'
import {LikeModel} from './model'

export const removeLike = async ({
  post_id,
  user_id,
}: {
  post_id: string
  user_id: string
}): Promise<boolean> => {
  const deleted = await LikeModel.deleteOne({post_id, user_id})
  return (deleted?.deletedCount || 0) > 0
}

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
