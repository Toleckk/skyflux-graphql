import {a, auth, injectArgs, injectRoot} from '@decorators'
import {UserService} from '@models/user'
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
    user: a([injectRoot()])(UserService.resolverUser),
  },
}
