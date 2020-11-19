import {IResolvers} from 'graphql-tools'
import {withFilter} from 'apollo-server'
import {pubsub} from '@pubsub'
import {UserService} from '@models/user'
import {PostService} from '@models/post'
import {
  DeletedLikeResolvers,
  LikeResolvers,
  MaybeLikeResolvers,
  MutationResolvers,
  SubscriptionResolvers,
} from '@models/types'
import * as LikeService from './service'

export const LikeResolver: IResolvers = {
  Like: <LikeResolvers>{
    user: root => UserService.resolveUser(root),
    post: (root, _, {user}) => PostService.resolvePost(root, user),
  },
  DeletedLike: <DeletedLikeResolvers>{
    user: root => UserService.resolveUser(root),
    post: (root, _, {user}) => PostService.resolvePost(root, user),
  },
  MaybeLike: <MaybeLikeResolvers>{
    __resolveType: like => ('deleted' in like ? 'DeletedLike' : 'Like'),
  },
  Mutation: <MutationResolvers>{
    createLike: (_, {post_id}, {user}) => LikeService.createLike(post_id, user),
    deleteLike: (_, {post_id}, {user}) => LikeService.deleteLike(post_id, user),
  },
  Subscription: <SubscriptionResolvers>{
    likeUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('like'),
        async ({likeUpdated: root}, {post_id}, {user}) =>
          PostService.resolvePost(root, user).then(
            post => !!post && String(post._id) === String(post_id),
          ),
      ),
    },
  },
}
