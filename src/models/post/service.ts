import Mongoose, {ObjectId} from 'mongoose'
import {isMongoId} from '@skyflux/api/utils/isMongoId'
import {Post, PostDbObject, User, UserDbObject} from '@skyflux/api/models/types'
import {UserService} from '@skyflux/api/models/user'
import {SubService} from '@skyflux/api/models/sub'
import {makeSearchPipeline} from '@skyflux/api/utils/makeSearchPipeline'
import {areEntitiesEqual} from '@skyflux/api/utils/areEntitiesEqual'
import {PostModel} from './model'

export const createPost = async (
  text: string,
  user: UserDbObject | User,
): Promise<
  (Partial<Omit<Post, 'user'>> & {user: UserDbObject | User}) | null
> =>
  PostModel.create({
    text,
    user: user._id,
  } as any).then(post => ({...post.toObject(), user}))

export const getFeed = async (
  user: User | UserDbObject,
  first = 25,
  after = 'ffffffffffffffffffffffff',
): Promise<Post[]> =>
  PostModel.aggregate([
    {$match: {deleted: {$ne: true}}},
    {
      $lookup: {
        from: 'subs',
        let: {user: '$user'},
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {$eq: ['$to', '$$user']},
                  {$eq: ['$accepted', true]},
                  {$ne: ['$deleted', true]},
                  {$eq: ['$from', user._id]},
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
                {$eq: ['$user', user._id]},
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

export const deletePost = async (
  _id: string,
  user: User | UserDbObject,
): Promise<
  | (Omit<PostDbObject, 'user'> & {
      user: ObjectId | UserDbObject | User
      deleted: true
    })
  | null
> => {
  const post = await PostModel.findOne({_id, user: user._id})

  if (!post) return null

  await post.delete()

  return {...post.toObject(), user, deleted: true}
}

export const getPostById = async (
  _id: string | Mongoose.Types.ObjectId,
  user?: UserDbObject,
  ignoreUser?: boolean,
): Promise<PostDbObject | null> => {
  const post = await PostModel.findOne({_id})

  if (!post) return null

  if (ignoreUser) return post

  return canSeePost(post, user).then(canSee => (canSee ? post : null))
}

export const getFoundPosts = async (
  text: string,
  user?: User | UserDbObject,
  first = 25,
  after?: string,
): Promise<Post[]> => {
  const posts = await PostModel.aggregate([
    ...makeSearchPipeline({after, text, field: 'text'}),
    {$match: {deleted: {$ne: true}}},
    {
      $lookup: {
        from: 'users',
        localField: 'user',
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
        foreignField: 'to',
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
                {
                  subs: {
                    $elemMatch: {
                      from: user._id,
                      accepted: true,
                      deleted: {$ne: true},
                    },
                  },
                },
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

export const resolvePost = async (
  root: {post: Post | PostDbObject | Mongoose.Types.ObjectId | string},
  user?: UserDbObject,
  ignoreUser?: boolean,
): Promise<Post | PostDbObject> => {
  if (typeof root.post === 'string' || isMongoId(root.post))
    return getPostById(root.post, user, ignoreUser) as Promise<
      Post | PostDbObject
    >

  return root.post
}

export const getPostsByNickname = async (
  nickname: string,
  user?: User | UserDbObject,
  first = 25,
  after = 'ffffffffffffffffffffffff',
): Promise<PostDbObject[]> => {
  const owner = await UserService.getUserByNickname(nickname)

  if (!owner) return []

  const canSee = await canSeeUserPosts(owner, user)

  if (!canSee) return []

  return PostModel.find({user: owner._id, _id: {$lt: after}})
    .sort({_id: -1})
    .limit(first + 1)
}

export const canSeePost = async (
  post: Post | PostDbObject,
  user: UserDbObject | undefined,
): Promise<boolean> => {
  const owner = await UserService.resolveUser(post)
  return canSeeUserPosts(owner, user)
}

export const canSeeUserPosts = async (
  owner?: User | UserDbObject | null,
  user?: User | UserDbObject | null,
): Promise<boolean> => {
  if (!owner) return false

  if (!owner.private) return true

  if (!user) return false

  if (String(owner._id) === String(user._id)) return true

  return SubService.isSubscribedBy(owner, user)
}

export const countUserPosts = async (user: User): Promise<number> =>
  PostModel.countDocuments({user: user._id})

export const isInFeed = async (
  post: Post | PostDbObject,
  user: User | UserDbObject,
): Promise<boolean> => {
  if (areEntitiesEqual(post.user, user)) return true

  const owner = await UserService.resolveUser(post)

  return !!owner && SubService.isSubscribedBy(owner, user)
}
