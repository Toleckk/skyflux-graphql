import {withFilter} from 'apollo-server'
import {UserService} from '@models/user'
import {LikeService} from '@models/like'
import {CommentService} from '@models/comment'
import {pubsub} from '@pubsub'
import {
  CommentDbObject,
  DeletedPostResolvers,
  MaybePostResolvers,
  MutationResolvers,
  PostResolvers,
  QueryResolvers,
  Resolvers,
  SubscriptionResolvers,
} from '@models/types'
import {paginate} from '@utils/paginate'
import * as PostService from './service'

export const PostResolver: Resolvers = {
  Post: <PostResolvers>{
    user: root => UserService.resolveUser(root),
    isLikedByMe: (root, _, {user}) => LikeService.isPostLikedBy(root, user),
    likesCount: root => LikeService.countPostLikes(root),
    commentsCount: root => CommentService.countPostComments(root),
    comments: (root, {first, after}) =>
      paginate(
        async (first, after): Promise<CommentDbObject[]> =>
          root
            ? CommentService.getCommentsByPostId(root._id, first, after)
            : [],
      )(first, after),
  },
  DeletedPost: <DeletedPostResolvers>{
    user: root => UserService.resolveUser(root),
  },
  Query: <QueryResolvers>{
    getPostById: (_, {_id}, {user}) => PostService.getPostById(_id, user),
    getPostsByNickname: (_, {nickname, first, after}, {user}) =>
      paginate((first, after) =>
        PostService.getPostsByNickname(nickname, user, first, after),
      )(first, after),
    getFoundPosts: (_, {text, first, after}, {user}) =>
      paginate((first, after) =>
        PostService.getFoundPosts(text, user, first, after),
      )(first, after),
    getFeed: (_, {first, after}, {user}) =>
      paginate((first, after) => PostService.getFeed(user, first, after))(
        first,
        after,
      ),
  },
  Mutation: <MutationResolvers>{
    createPost: (_, {post}, {user}) => PostService.createPost(post.text, user),
    deletePost: (_, {_id}, {user}) => PostService.deletePost(_id, user),
  },
  Subscription: <SubscriptionResolvers>{
    postCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('post'),
        async ({postCreated}, {nickname}, {user}): Promise<boolean> =>
          postCreated.user.nickname === nickname &&
          PostService.canSeePost(postCreated, user),
      ),
    },
    postDeleted: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('post'),
        async ({postDeleted}, {nickname}, {user}): Promise<boolean> =>
          postDeleted.user.nickname === nickname &&
          PostService.canSeePost(postDeleted, user),
      ),
    },
    postUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('post'),
        async ({postUpdated}, {nickname}, {user}): Promise<boolean> =>
          postUpdated.user.nickname === nickname &&
          PostService.canSeePost(postUpdated, user),
      ),
    },
  },
  MaybePost: <MaybePostResolvers>{
    __resolveType: root => ('deleted' in root ? 'DeletedPost' : 'Post'),
  },
}
