import {Post} from '@models/post'
import {User} from '@models/user'
import {Like} from './types'
import {LikeModel} from './model'

export const removeLike = async ({
  post_id,
  user,
}: {
  post_id: string
  user: User
}): Promise<boolean> => {
  const deleted = await LikeModel.deleteOne({post_id, user_id: user._id})
  return (deleted?.deletedCount || 0) > 0
}

export const createLike = async ({
  post_id,
  user,
}: {
  post_id: string
  user: User
}): Promise<Partial<Like> | null> => {
  const like = await LikeModel.create({post_id, user_id: user._id})
  return like || null
}

export const isPostLikedBy = async ({
  post,
  user,
}: {
  post: Post
  user?: User
}): Promise<boolean> => {
  if (!user) return false

  return LikeModel.exists({post_id: post._id, user_id: user._id})
}

export const countPostLikes = async ({post}: {post: Post}): Promise<number> =>
  LikeModel.count({post_id: post._id})
