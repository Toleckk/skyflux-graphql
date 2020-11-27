import Mongoose from 'mongoose'
import {
  DeletedLike,
  Like,
  LikeDbObject,
  Post,
  PostDbObject,
  UserDbObject,
} from '@models/types'
import {EventService} from '@models/event'
import {PostService} from '@models/post'
import {isMongoId} from '@utils/isMongoId'
import {LikeModel} from './model'
import {likeCreated} from './events'
import {notifyLikeChanged} from './subscriptions'

export const deleteLike = async (
  post_id: string,
  user: UserDbObject,
): Promise<DeletedLike | null> => {
  const like = await LikeModel.findOne({post: post_id, user: user._id})

  if (!like) return null

  await like.deleteOne()

  const deletedLike: DeletedLike = {
    ...like.toObject(),
    user,
    deleted: true,
  }

  EventService.deleteEvent(likeCreated({like, user}))
  notifyLikeChanged(like)

  return deletedLike
}

export const deleteLikesByPost = async (
  post: PostDbObject | Post,
): Promise<void> => {
  await LikeModel.deleteMany({post: post._id})
}

export const createLike = async (
  postId: string,
  user: UserDbObject,
): Promise<LikeDbObject | Like | null> => {
  const post = await PostService.getPostById(postId, user)

  if (!post) return null

  const likeDocument = await LikeModel.create({post: post._id, user: user._id})

  if (!likeDocument) return null

  const like: Like = {
    ...likeDocument.toObject(),
    user,
    post,
  }

  EventService.createEvent(likeCreated({like, user}))
  notifyLikeChanged(like)

  return like
}

export const isPostLikedBy = async (
  post: Post,
  user?: UserDbObject,
): Promise<boolean> => {
  if (!user) return false

  return LikeModel.exists({post: post._id, user: user._id})
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
  const like = await LikeModel.findById(_id)
  return like || null
}
