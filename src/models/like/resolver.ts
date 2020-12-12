import {IResolvers} from 'graphql-tools'
import {withFilter} from 'apollo-server'
import {pubsub} from '@skyflux/api/pubsub'
import {UserService} from '@skyflux/api/models/user'
import {PostService} from '@skyflux/api/models/post'
import {
  DeletedLikeResolvers,
  LikeResolvers,
  MaybeLikeResolvers,
  MutationResolvers,
  SubscriptionResolvers,
} from '@skyflux/api/models/types'
import * as LikeService from './service'
import {filterLikeUpdated} from './subscriptions'

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
    __resolveType: like =>
      'deleted' in like && like.deleted ? 'DeletedLike' : 'Like',
  },
  Mutation: <MutationResolvers>{
    createLike: (_, {post_id}, {user}) => LikeService.createLike(post_id, user),
    deleteLike: (_, {post_id}, {user}) => LikeService.deleteLike(post_id, user),
  },
  Subscription: <SubscriptionResolvers>{
    likeUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('like'),
        filterLikeUpdated,
      ),
    },
  },
}
