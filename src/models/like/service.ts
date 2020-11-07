import Mongoose from 'mongoose'
import {pubsub} from '@pubsub'
import {EventService} from '@models/event'
import {Post, PostDocument} from '@models/post'
import {User} from '@models/user'
import {likeCreated} from '@models/like/events'
import {isMongoId} from '@utils/isMongoId'
import {Like, LikeDocument} from './types'
import {LikeModel} from './model'

export const deleteLike = async ({
  post_id,
  user,
}: {
  post_id: string
  user: User
}): Promise<boolean> => {
  const like = await LikeModel.findOne({post_id, user_id: user._id})

  if (!like) return false

  await like.deleteOne()
  await EventService.deleteEvent(likeCreated({like, user}))
  await pubsub.publish('like', {likeDeleted: like})

  return true
}

export const deleteLikesByPost = async ({
  post,
}: {
  post: PostDocument | Post
}): Promise<void> => {
  await LikeModel.deleteMany({post_id: post._id})
}

export const createLike = async ({
  post_id,
  user,
}: {
  post_id: string
  user: User
}): Promise<Partial<Like> | null> => {
  const like = await LikeModel.create({post_id, user_id: user._id})

  if (!like) return null

  await EventService.createEvent(likeCreated({like, user}))
  await pubsub.publish('like', {likeCreated: like})

  return like
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

export const resolveLike = async ({
  root,
}: {
  root:
    | {like: LikeDocument}
    | {like_id: LikeDocument | string | Mongoose.Types.ObjectId}
}): Promise<LikeDocument | null> => {
  if ('like' in root) return root.like

  if (typeof root.like_id !== 'string' && !isMongoId(root.like_id))
    return root.like_id

  return getLikeById({_id: root.like_id})
}

export const getLikeById = async ({
  _id,
}: {
  _id: string | Mongoose.Types.ObjectId
}): Promise<LikeDocument | null> => {
  const like = await LikeModel.findById(_id)
  return like || null
}
