import {Post, PostDocument} from '@models/post/types'
import {User, UserService} from '@models/user'
import {a, auth, injectArgs} from '@decorators'
import * as PostService from './service'

export const PostResolver = {
  Query: {
    getPostById: a([injectArgs()])(PostService.getPostById),
  },
  Mutation: {
    createPost: a([injectArgs(), auth()])(PostService.createPost),
    deletePost: a([injectArgs(), auth()])(PostService.deletePost),
  },
  Post: {
    user: async (root: PostDocument | Post): Promise<User | null> => {
      if ('user' in root) return root.user

      return UserService.getUserById(root.user_id)
    },
  },
}
