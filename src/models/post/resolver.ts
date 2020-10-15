import {a, auth, injectArgs, injectRoot, paginate, validate} from '@decorators'
import {UserService} from '@models/user'
import {LikeService} from '@models/like'
import {CommentService} from '@models/comment'
import {Event} from '@models/event'
import {pubsub} from '@pubsub'
import {withFilter} from 'apollo-server'
import {Post} from '@models/post/types'
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
    getFeed: a([auth(), paginate(), injectArgs()])(PostService.getFeed),
  },
  Subscription: {
    postCreated: {
      subscribe: withFilter(
        (): AsyncIterator<Event> => pubsub.asyncIterator('post'),
        async (
          {postCreated}: {postCreated: Post},
          {nickname},
          {user},
        ): Promise<boolean> =>
          postCreated.user.nickname === nickname &&
          PostService.canSeePost({user, post: postCreated}),
      ),
    },
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
    commentsCount: a([injectRoot({as: 'post'})])(({post}) =>
      CommentService.countPostComments({post}),
    ),
  },
}
