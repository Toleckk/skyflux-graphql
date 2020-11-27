import Mongoose from 'mongoose'
import {
  Comment,
  CommentDbObject,
  Post,
  PostDbObject,
  Scalars,
  UserDbObject,
} from '@skyflux/api/models/types'
import {PostService} from '@skyflux/api/models/post'
import {EventService} from '@skyflux/api/models/event'
import {isMongoId} from '@skyflux/api/utils/isMongoId'
import {CommentModel} from './model'
import {commentCreated} from './events'
import {notifyCommentChanged} from './subscriptions'

export const createComment = async (
  text: string,
  post_id: string,
  user: UserDbObject,
): Promise<CommentDbObject | Comment | null> => {
  const post = await PostService.getPostById(post_id, user)

  if (!post) return null

  const commentDoc = await CommentModel.create<
    Omit<CommentDbObject, 'createdAt'>
  >({
    post: post._id,
    user: user._id,
    text,
  })

  if (!commentDoc) return null

  const comment: Comment = {
    ...commentDoc.toObject(),
    user,
    post,
  }

  EventService.createEvent(commentCreated({comment, user}))
  notifyCommentChanged(comment)

  return comment
}

export const deleteComment = async (
  _id: string,
  user: UserDbObject,
): Promise<(CommentDbObject & {deleted: true}) | null> => {
  const comment = await CommentModel.findById(_id)

  if (!(comment && (await canDeleteComment(comment, user)))) return null

  await comment.deleteOne()

  const deletedComment = {
    ...comment.toObject(),
    deleted: true,
  }

  EventService.deleteEvent(commentCreated({comment, user}))
  notifyCommentChanged(deletedComment)

  return deletedComment
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
  CommentModel.countDocuments({post: post._id})

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
