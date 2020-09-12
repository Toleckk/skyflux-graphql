import {applySpec, nthArg, path, pipe, prop} from 'ramda'
import {Post, PostDocument} from '@models/post/types'
import {User, UserService} from '@models/user'
import * as PostService from './service'

export const PostResolver = {
  Query: {
    getPostById: pipe(nthArg(1), PostService.getPostById),
  },
  Mutation: {
    createPost: pipe(
      applySpec({
        text: pipe(nthArg(1), prop<'text', string>('text')),
        user_id: pipe(nthArg(2), path(['user', '_id'])),
      }),
      PostService.createPost,
    ),
    deletePost: pipe(
      applySpec({
        _id: pipe(nthArg(1), prop<'_id', string>('_id')),
        user_id: pipe(nthArg(2), path(['user', '_id'])),
      }),
      PostService.deletePost,
    ),
  },
  Post: {
    user: async (root: PostDocument | Post): Promise<User | null> => {
      if ('user' in root) return root.user

      return UserService.getUserById(root.user_id)
    },
  },
}
