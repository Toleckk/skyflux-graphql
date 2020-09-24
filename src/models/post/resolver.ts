import {a, auth, injectArgs, injectRoot, paginate} from '@decorators'
import {UserService} from '@models/user'
import * as PostService from './service'

export const PostResolver = {
  Query: {
    getPostById: a([injectArgs()])(PostService.getPostById),
    getPostsByNickname: a([injectArgs(), paginate()])(
      PostService.getPostsByNickname,
    ),
  },
  Mutation: {
    createPost: a([injectArgs(), auth()])(PostService.createPost),
    deletePost: a([injectArgs(), auth()])(PostService.deletePost),
  },
  Post: {
    user: a([injectRoot()])(UserService.resolveUser),
  },
}
