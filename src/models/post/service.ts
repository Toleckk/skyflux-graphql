import Mongoose from 'mongoose'
import {isMongoId} from '@utils/isMongoId'
import {ID} from '@models/types'
import {User, UserService} from '@models/user'
import {ChannelService} from '@models/channel'
import {Post} from './types'
import {PostModel} from './model'

export const createPost = async ({
  text,
  user,
}: {
  text: string
  user: User
}): Promise<Post | null> => {
  const post = await PostModel.create({text, user_id: user._id})

  await ChannelService.subscribeUserToChannel({
    channel: `Comment_${post._id}`,
    user,
  })

  return {
    ...post.toObject(),
    user,
  }
}

export const deletePost = async ({
  _id,
  user,
}: {
  _id: string
  user: User
}): Promise<boolean> => {
  const deleted = await PostModel.deleteOne({_id, user_id: user._id})
  return (deleted.deletedCount || 0) > 0
}

export const getPostById = async ({
  _id,
}: {
  _id: string | Mongoose.Types.ObjectId
}): Promise<Partial<Post> | null> => {
  const post = await PostModel.findById(_id)
  return post || null
}

export const resolvePost = ({
  root,
}: {
  root:
    | {post: Partial<Post>}
    | {post_id: Partial<Post> | string | Mongoose.Types.ObjectId}
}): Promise<Partial<Post> | null> | Partial<Post> => {
  if ('post' in root) return root.post

  if (typeof root.post_id === 'string' || isMongoId(root.post_id))
    return getPostById({_id: root.post_id})

  return root.post_id
}

export const getPostsByNickname = async ({
  nickname,
  first = 25,
  after = 'ffffffffffffffffffffffff',
}: {
  nickname: string
  first?: number
  after?: ID
}): Promise<Partial<Post>[]> => {
  const user = await UserService.getUserByNickname({nickname})

  if (!user) return []

  return PostModel.find({user_id: user._id, _id: {$lt: after}})
    .sort({_id: -1})
    .limit(first)
}
