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
    getFeed: a([auth(), paginate()])(PostService.getFeed),
  },
  Mutation: {
    createPost: a([injectArgs(), auth(), validate()])(PostService.createPost),
    deletePost: a([injectArgs(), auth()])(PostService.deletePost),
  },
  Post: {
    user: a([injectRoot()])(({root}) => UserService.resolveUser({root})),
    isLikedByMe: a([injectRoot({as: 'post'}), auth({passOnly: true})])(
      LikeService.isPostLikedBy,
    ),
    likesCount: a([injectRoot({as: 'post'})])(LikeService.countPostLikes),
  },
}
