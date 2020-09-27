import {a, auth, injectArgs, injectRoot, paginate} from '@decorators'
import {UserService} from '@models/user'
import * as PostService from './service'

export const PostResolver = {
  Query: {
    getPostById: a([injectArgs(), auth({passOnly: true})])(
      PostService.getPostById,
    ),
    getPostsByNickname: a([injectArgs(), paginate(), auth({passOnly: true})])(
      PostService.getPostsByNickname,
    ),
    getFoundPosts: a([injectArgs(), paginate(), auth({passOnly: true})])(
      PostService.getFoundPosts,
    ),
  },
  Mutation: {
    createPost: a([injectArgs(), auth()])(PostService.createPost),
    deletePost: a([injectArgs(), auth()])(PostService.deletePost),
  },
  Post: {
    user: a([injectRoot()])(({root}) => UserService.resolveUser({root})),
  },
}
