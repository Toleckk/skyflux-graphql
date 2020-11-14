import Mongoose from 'mongoose'
import {
  Comment,
  CommentDbObject,
  Post,
  PostDbObject,
  Scalars,
  UserDbObject,
} from '@models/types'
import {PostService} from '@models/post'
import {EventService} from '@models/event'
import {isMongoId} from '@utils/isMongoId'
import {pubsub} from '@pubsub'
import {CommentModel} from './model'
import {commentCreated} from './events'

export const createComment = async (
  text: string,
  post_id: string,
  user: UserDbObject,
): Promise<CommentDbObject | null> => {
  if (!(await PostService.getPostById(post_id, user))) return null

  const comment = await CommentModel.create<Omit<CommentDbObject, 'createdAt'>>(
    {
      post: post_id,
      user: user._id,
      text,
    },
  )

  await EventService.createEvent(commentCreated({comment, user}))
  await pubsub.publish('comment', {commentCreated: comment})

  return comment
}

export const deleteComment = async (
  _id: string,
  user: UserDbObject,
): Promise<CommentDbObject | null> => {
  const comment = await CommentModel.findById(_id)

  if (!(comment && (await canDeleteComment(comment, user)))) return null

  await comment.deleteOne()
  await EventService.deleteEvent(commentCreated({comment, user}))
  await pubsub.publish('comment', {
    commentDeleted: comment,
  })

  return comment
}

export const getCommentById = async (
  _id: string | Mongoose.Types.ObjectId,
): Promise<CommentDbObject | null> => CommentModel.findById(_id)

export const getCommentsByPostId = async (
  post_id: Scalars['ID'],
  first = 25,
  after = 'ffffffffffffffffffffffff',
): Promise<CommentDbObject[]> =>
  CommentModel.find({post: post_id})
    .find(after ? {_id: {$lt: after}} : {})
    .sort({_id: -1})
    .limit(first + 1)

export const resolveComment = async (root: {
  comment: Comment | CommentDbObject | Mongoose.Types.ObjectId | string
}): Promise<Comment | CommentDbObject | null> => {
  if (typeof root.comment === 'string' || isMongoId(root.comment))
    return getCommentById(root.comment)

  return root.comment
}

export const countPostComments = async (post: Post): Promise<number> =>
  CommentModel.count({post_id: post._id})

export const canDeleteComment = async (
  comment: Comment | CommentDbObject,
  user: UserDbObject,
): Promise<boolean> => {
  const userId = '_id' in comment.user ? comment.user._id : comment.user
  if (String(userId) === String(user._id)) return true

  const post = await PostService.resolvePost(comment, user)
  if (!post) return false

  const postOwnerId = '_id' in post.user ? post.user._id : post.user

  return String(postOwnerId) === String(user._id)
}

export const deleteCommentsByPost = async (
  post: PostDbObject | Post,
): Promise<void> => {
  await CommentModel.deleteMany({post: post._id})
}
