import {PostService} from '@models/post'
import {User} from '@models/user'
import {CommentModel} from './model'
import {Comment} from './types'

export const createComment = async ({
  post_id,
  text,
  user,
}: {
  post_id: string
  text: string
  user: User
}): Promise<Partial<Comment> | null> => {
  if (!(await PostService.getPostById({_id: post_id}))) return null

  return CommentModel.create({post_id, text, user_id: user._id})
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
