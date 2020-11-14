import Mongoose from 'mongoose'
import {pubsub} from '@pubsub'
import {
  Like,
  LikeDbObject,
  Post,
  PostDbObject,
  UserDbObject,
} from '@models/types'
import {EventService} from '@models/event'
import {likeCreated} from '@models/like/events'
import {isMongoId} from '@utils/isMongoId'
import {LikeModel} from './model'

export const deleteLike = async (
  post_id: string,
  user: UserDbObject,
): Promise<boolean> => {
  const like = await LikeModel.findOne({post: post_id, user: user._id})

  if (!like) return false

  await like.deleteOne()
  await EventService.deleteEvent(likeCreated({like, user}))
  await pubsub.publish('like', {likeDeleted: like})

  return true
}

export const deleteLikesByPost = async (
  post: PostDbObject | Post,
): Promise<void> => {
  await LikeModel.deleteMany({post: post._id})
}

export const createLike = async (
  postId: string,
  user: UserDbObject,
): Promise<LikeDbObject | null> => {
  const like = await LikeModel.create({post: postId, user: user._id})

  if (!like) return null

  await EventService.createEvent(likeCreated({like, user}))
  await pubsub.publish('like', {likeCreated: like})

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
  LikeModel.count({post: post._id})

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
