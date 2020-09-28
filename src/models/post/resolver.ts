import {a, auth, injectArgs, injectRoot, paginate, validate} from '@decorators'
import {UserService} from '@models/user'
import {LikeService} from '@models/like'
import {assoc, converge, identity, pipe, prop} from 'ramda'
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
    createPost: a([injectArgs(), auth(), validate()])(PostService.createPost),
    deletePost: a([injectArgs(), auth()])(PostService.deletePost),
  },
  Post: {
    user: a([injectRoot()])(({root}) => UserService.resolveUser({root})),
    isLikedByMe: a([injectRoot(), auth({passOnly: true})])(
      pipe(
        converge(assoc('post'), [prop('root'), identity]),
        LikeService.isPostLikedBy,
      ),
    ),
    likesCount: a([injectRoot()])(
      pipe(
        converge(assoc('post'), [prop('root'), identity]),
        LikeService.countPostLikes,
      ),
    ),
  },
}
