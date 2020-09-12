import {PostService} from '@models/post'
import {CommentModel} from './model'
import {Comment} from './types'

export const createComment = async ({
  post_id,
  text,
  user_id,
}: {
  post_id: string
  text: string
  user_id: string
}): Promise<Partial<Comment> | null> => {
  if (!(await PostService.getPostById({_id: post_id}))) return null

  return CommentModel.create({post_id, text, user_id})
}

export const deleteComment = async ({
  _id,
  user_id,
}: {
  _id: string
  user_id: string
}): Promise<boolean> => {
  const deleted = await CommentModel.deleteOne({_id, user_id})
  return (deleted?.deletedCount || 0) > 0
}
