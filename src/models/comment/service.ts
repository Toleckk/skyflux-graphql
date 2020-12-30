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
import {isMongoId} from '@skyflux/api/utils/isMongoId'
import {CommentModel} from './model'

export const createComment = async (
  text: string,
  post_id: string,
  user: UserDbObject,
): Promise<
  | (Omit<Comment, 'user' | 'post'> & {user: UserDbObject; post: PostDbObject})
  | null
> => {
  const post = await PostService.getPostById(post_id, user)

  if (!post) return null

  const commentDoc = await CommentModel.create({
    post: post._id,
    user: user._id,
    text,
  } as any)

  return {
    ...commentDoc.toObject(),
    user,
    post,
  }
}

export const deleteComment = async (
  _id: string,
  user: UserDbObject,
): Promise<(CommentDbObject & {deleted: true}) | null> => {
  const comment = await CommentModel.findOne({_id})

  if (!(comment && (await canDeleteComment(comment, user)))) return null

  await comment.delete()

  return {
    ...comment.toObject(),
    deleted: true,
  }
}

export const getCommentById = async (
  _id: string | Mongoose.Types.ObjectId,
): Promise<CommentDbObject | null> => CommentModel.findOne({_id})

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
