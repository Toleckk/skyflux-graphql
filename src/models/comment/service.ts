import Mongoose from 'mongoose'
import {Post, PostService} from '@models/post'
import {User} from '@models/user'
import {ID} from '@models/types'
import {EventService} from '@models/event'
import {isMongoId} from '@utils/isMongoId'
import {pubsub} from '@pubsub'
import {CommentModel} from './model'
import {Comment, CommentDocument} from './types'
import {commentCreated} from './events'

export const createComment = async ({
  post_id,
  text,
  user,
}: {
  post_id: string
  text: string
  user: User
}): Promise<Partial<Comment> | null> => {
  if (!(await PostService.getPostById({_id: post_id, user}))) return null

  const comment = await CommentModel.create({post_id, text, user_id: user._id})

  await EventService.createEvent(commentCreated({comment}))
  await pubsub.publish('comment', {commentCreated: comment})

  return comment
}

export const deleteComment = async ({
  _id,
  user,
}: {
  _id: string
  user: User
}): Promise<CommentDocument | null> => {
  const comment = await CommentModel.findById(_id)

  if (!(comment && (await canDeleteComment({comment, user})))) return null

  await comment.deleteOne()
  await EventService.deleteEvent(commentCreated({comment}))
  await pubsub.publish('comment', {
    commentDeleted: comment,
  })

  return comment
}

export const getCommentById = async ({
  _id,
}: {
  _id: string | Mongoose.Types.ObjectId
}): Promise<Partial<Comment> | null> => CommentModel.findById(_id)

export const getCommentsByPostId = async ({
  post_id,
  first = 25,
  after = 'ffffffffffffffffffffffff',
}: {
  post_id: ID
  first?: number
  after?: ID
}): Promise<Partial<Comment>[]> =>
  CommentModel.find({post_id})
    .find(after ? {_id: {$lt: after}} : {})
    .sort({_id: -1})
    .limit(first + 1)

export const resolveComment = ({
  root,
}: {
  root:
    | {comment: Partial<Comment>}
    | {comment_id: Partial<Comment> | string | Mongoose.Types.ObjectId}
}): Promise<Partial<Comment> | null> | Partial<Comment> => {
  if ('comment' in root) return root.comment

  if (typeof root.comment_id !== 'string' && !isMongoId(root.comment_id))
    return root.comment_id

  return getCommentById({_id: root.comment_id})
}

export const countPostComments = async ({
  post,
}: {
  post: Post
}): Promise<number> => CommentModel.count({post_id: post._id})

export const canDeleteComment = async ({
  comment,
  user,
}: {
  comment: Comment | CommentDocument
  user: User
}): Promise<boolean> => {
  const userId = 'user_id' in comment ? comment.user_id : comment.user._id
  if (String(userId) === String(user._id)) return true

  const post = await PostService.resolvePost({root: comment, user})
  if (!post) return false

  const postOwnerId = 'user_id' in post ? post.user_id : post.user._id

  return String(postOwnerId) === String(user._id)
}
