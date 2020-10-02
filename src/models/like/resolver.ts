import {Like, LikeDocument} from '@models/like/types'
import {User, UserService} from '@models/user'
import {Post, PostService} from '@models/post'
import {a, auth, injectArgs} from '@decorators'
import * as LikeService from './service'

export const LikeResolver = {
  Mutation: {
    createLike: a([injectArgs(), auth()])(LikeService.createLike),
    deleteLike: a([injectArgs(), auth()])(LikeService.deleteLike),
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
