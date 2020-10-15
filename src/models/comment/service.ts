import Mongoose from 'mongoose'
import {Post, PostService} from '@models/post'
import {User} from '@models/user'
import {ID} from '@models/types'
import {EventService} from '@models/event'
import {isMongoId} from '@utils/isMongoId'
import {CommentModel} from './model'
import {Comment} from './types'
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

  return comment
}

export const deleteComment = async ({
  _id,
  user,
}: {
  _id: string
  user: User
}): Promise<boolean> => {
  const deleted = await CommentModel.deleteOne({_id, user_id: user._id})
  return (deleted?.deletedCount || 0) > 0
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
