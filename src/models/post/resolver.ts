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
import {
  filterFeedUpdated,
  filterPostsUpdated,
  filterPostUpdated,
} from './subscriptions'

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
    post: (_, {_id}, {user}) => PostService.getPostById(_id, user),
    userPosts: (_, {nickname, first, after}, {user}) =>
      paginate((first, after) =>
        PostService.getPostsByNickname(nickname, user, first, after),
      )(first, after),
    posts: (_, {query, first, after}, {user}) =>
      paginate((first, after) =>
        PostService.getFoundPosts(query, user, first, after),
      )(first, after),
    feed: (_, {first, after}, {user}) =>
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
    postUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('post'),
        filterPostUpdated,
      ),
    },
    postsUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('post'),
        filterPostsUpdated,
      ),
    },
    feedUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('post'),
        filterFeedUpdated,
      ),
    },
  },
  MaybePost: <MaybePostResolvers>{
    __resolveType: root => ('deleted' in root ? 'DeletedPost' : 'Post'),
  },
}
