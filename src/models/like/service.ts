import Mongoose from 'mongoose'
import {
  DeletedLike,
  Like,
  LikeDbObject,
  Post,
  UserDbObject,
} from '@skyflux/api/models/types'
import {PostService} from '@skyflux/api/models/post'
import {isMongoId} from '@skyflux/api/utils/isMongoId'
import {LikeModel} from './model'

export const deleteLike = async (
  post_id: string,
  user: UserDbObject,
): Promise<DeletedLike | null> => {
  const like = await LikeModel.findOne({post: post_id, user: user._id})

  if (!like) return null

  await like.delete()

  return {
    ...like.toObject(),
    user,
    deleted: true,
  }
}

export const createLike = async (
  postId: string,
  user: UserDbObject,
): Promise<LikeDbObject | Like | null> => {
  const post = await PostService.getPostById(postId, user)

  if (!post) return null

  const likeDocument = await LikeModel.create({post: post._id, user: user._id})

  if (!likeDocument) return null

  return {
    ...likeDocument.toObject(),
    user,
    post,
  }
}

export const isPostLikedBy = async (
  post: Post,
  user?: UserDbObject,
): Promise<boolean> => {
  if (!user) return false

  return LikeModel.exists({post: post._id, user: user._id, deleted: false})
}

export const countPostLikes = async (post: Post): Promise<number> =>
  LikeModel.countDocuments({post: post._id})

export const resolveLike = async (root: {
  like: Like | LikeDbObject | Mongoose.Types.ObjectId | string
}): Promise<Like | LikeDbObject | null> => {
  if (typeof root.like === 'string' || isMongoId(root.like))
    return getLikeById(root.like)

  return root.like
}

export const getLikeById = async (
  _id: Mongoose.Types.ObjectId | string,
): Promise<LikeDbObject | null> => {
  const like = await LikeModel.findOne({_id})
  return like || null
}
