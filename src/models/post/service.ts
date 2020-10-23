import Mongoose from 'mongoose'
import {isMongoId} from '@utils/isMongoId'
import {ID} from '@models/types'
import {pubsub} from '@pubsub'
import {User, UserService} from '@models/user'
import {ChannelService} from '@models/channel'
import {SubService} from '@models/sub'
import {makeSearchPipeline} from '@utils/makeSearchPipeline'
import {Post, PostDocument} from './types'
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

  const postWithUser = {
    ...post.toObject(),
    user,
  }

  await pubsub.publish('post', {postCreated: postWithUser})

  return postWithUser
}

export const getFeed = async ({
  user,
  after = 'ffffffffffffffffffffffff',
  first = 25,
}: {
  user: User
  after?: ID
  first?: number
}): Promise<Post[]> =>
  PostModel.aggregate([
    {
      $lookup: {
        from: 'subs',
        let: {user: '$user_id'},
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {$eq: ['$to_id', '$$user']},
                  {$eq: ['$accepted', true]},
                  {$eq: ['$from_id', user._id]},
                ],
              },
            },
          },
        ],
        as: 'receivers',
      },
    },
    {
      $match: {
        $expr: {
          $and: [
            {
              $or: [
                {$eq: ['$user_id', user._id]},
                {$eq: [{$size: '$receivers'}, 1]},
              ],
            },
            {$lt: ['$_id', Mongoose.Types.ObjectId(after)]},
          ],
        },
      },
    },
    {$sort: {_id: -1}},
    {$limit: first + 1},
  ])

export const deletePost = async ({
  _id,
  user,
}: {
  _id: string
  user: User
}): Promise<PostDocument | null> => {
  const post = await PostModel.findOne({_id, user_id: user._id})

  if (!post) return null

  await post.deleteOne()
  await pubsub.publish('post', {
    postDeleted: {
      ...post.toObject(),
      user,
    },
  })

  return post
}

export const getPostById = async ({
  _id,
  user,
}: {
  user?: User
  _id: string | Mongoose.Types.ObjectId
}): Promise<PostDocument | null> => {
  const post = await PostModel.findById(_id)

  if (!post) return null

  return canSeePost({user, post}).then(canSee => (canSee ? post : null))
}

export const getFoundPosts = async ({
  text,
  user,
  after,
  first = 25,
}: {
  text: string
  user?: User
  after?: string
  first?: number
}): Promise<Post[]> => {
  const posts = await PostModel.aggregate([
    ...makeSearchPipeline({after, text, field: 'text'}),
    {
      $lookup: {
        from: 'users',
        localField: 'user_id',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: {
        path: '$user',
      },
    },
    {
      $lookup: {
        from: 'subs',
        localField: 'user._id',
        foreignField: 'to_id',
        as: 'subs',
      },
    },
    {
      $match: {
        $or: [
          {'user.private': false},
          ...(user
            ? [
                {'user._id': user._id},
                {subs: {$elemMatch: {from_id: user._id, accepted: true}}},
              ]
            : []),
        ],
      },
    },
    {$limit: first + 1},
  ])

  return posts.map(post => ({
    ...post,
    __cursor: [post.score, post._id].join(' '),
  }))
}

export const resolvePost = async ({
  root,
  user,
}: {
  user?: User
  root:
    | {post: Post | PostDocument}
    | {post_id: Post | PostDocument | string | Mongoose.Types.ObjectId}
}): Promise<PostDocument | Post | null> => {
  if ('post' in root) return root.post

  if (typeof root.post_id === 'string' || isMongoId(root.post_id))
    return getPostById({_id: root.post_id, user})

  return root.post_id
}

export const getPostsByNickname = async ({
  nickname,
  user,
  first = 25,
  after = 'ffffffffffffffffffffffff',
}: {
  nickname: string
  user?: User
  first?: number
  after?: ID
}): Promise<Partial<Post>[]> => {
  const owner = await UserService.getUserByNickname({nickname})

  if (!owner) return []

  const canSee = await canSeeUserPosts({owner, user})

  if (!canSee) return []

  return PostModel.find({user_id: owner._id, _id: {$lt: after}})
    .sort({_id: -1})
    .limit(first + 1)
}

export const canSeePost = async ({
  user,
  post,
}: {
  user?: User
  post: Post | PostDocument
}): Promise<boolean> => {
  const owner = await UserService.resolveUser({root: post})
  return canSeeUserPosts({user, owner})
}

export const canSeeUserPosts = async ({
  owner,
  user,
}: {
  owner?: User | null
  user?: User | null
}): Promise<boolean> => {
  if (!owner) return false

  if (!owner.private) return true

  if (!user) return false

  if (String(owner._id) === String(user._id)) return true

  return SubService.isSubscribedBy({from: user, to: owner})
}

export const countUserPosts = async ({user}: {user: User}): Promise<number> =>
  PostModel.count({user_id: user._id})
