import {applySpec, nthArg, path, pipe, prop} from 'ramda'
import {Like, LikeDocument} from '@models/like/types'
import {User, UserService} from '@models/user'
import {Post, PostService} from '@models/post'
import * as LikeService from './service'

export const LikeResolver = {
  Mutation: {
    createLike: pipe(
      applySpec({
        post_id: pipe(nthArg(1), prop<'post_id', string>('post_id')),
        user_id: pipe(nthArg(2), path(['user', '_id'])),
      }),
      LikeService.createLike,
    ),
    removeLike: pipe(
      applySpec({
        post_id: pipe(nthArg(1), prop<'post_id', string>('post_id')),
        user_id: pipe(nthArg(2), path(['user', '_id'])),
      }),
      LikeService.removeLike,
    ),
  },
  Like: {
    user: async (root: LikeDocument | Like): Promise<User | null> => {
      if ('user' in root) return root.user

      return UserService.getUserById(root.user_id)
    },
    post: async (root: LikeDocument | Like): Promise<Partial<Post> | null> => {
      if ('post' in root) return root.post

      return PostService.getPostById(root.post_id)
    },
  },
}
