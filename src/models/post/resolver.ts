import {a, auth, injectArgs, injectRoot, paginate, validate} from '@decorators'
import {UserService} from '@models/user'
import {LikeService} from '@models/like'
import {CommentDocument, CommentService} from '@models/comment'
import {pubsub} from '@pubsub'
import {withFilter} from 'apollo-server'
import {Post} from './types'
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
        (): AsyncIterator<Post> => pubsub.asyncIterator('post'),
        async (
          {postCreated}: {postCreated: Post},
          {nickname},
          {user},
        ): Promise<boolean> =>
          postCreated.user.nickname === nickname &&
          PostService.canSeePost({user, post: postCreated}),
      ),
    },
    postDeleted: {
      subscribe: withFilter(
        (): AsyncIterator<Post> => pubsub.asyncIterator('post'),
        async (
          {postDeleted}: {postDeleted: Post},
          {nickname},
          {user},
        ): Promise<boolean> =>
          postDeleted.user.nickname === nickname &&
          PostService.canSeePost({user, post: postDeleted}),
      ),
    },
    postUpdated: {
      subscribe: withFilter(
        (): AsyncIterator<Post> => pubsub.asyncIterator('post'),
        async (
          {postUpdated}: {postUpdated: Post},
          {nickname},
          {user},
        ): Promise<boolean> =>
          postUpdated.user.nickname === nickname &&
          PostService.canSeePost({user, post: postUpdated}),
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
    comments: a([paginate(), injectRoot(), injectArgs()])(
      async ({root, after, first, ...rest}): Promise<CommentDocument[]> => {
        console.log(rest, after, first)
        if (root === null) return []
        return CommentService.getCommentsByPostId({
          post_id: root._id,
          after: after,
          first: first,
        })
      },
    ),
  },
  DeletedPost: {
    user: a([injectRoot()])(({root}) => UserService.resolveUser({root})),
  },
}
