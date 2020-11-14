import {IResolvers} from 'graphql-tools'
import {withFilter} from 'apollo-server'
import {pubsub} from '@pubsub'
import {UserService} from '@models/user'
import {PostService} from '@models/post'
import {
  LikeResolvers,
  MutationResolvers,
  SubscriptionResolvers,
} from '@models/types'
import * as LikeService from './service'

export const LikeResolver: IResolvers = {
  Like: <LikeResolvers>{
    user: root => UserService.resolveUser(root),
    post: (root, _, {user}) => PostService.resolvePost(root, user),
  },
  Mutation: <MutationResolvers>{
    createLike: (_, {post_id}, {user}) => LikeService.createLike(post_id, user),
    deleteLike: (_, {post_id}, {user}) => LikeService.deleteLike(post_id, user),
  },
  Subscription: <SubscriptionResolvers>{
    likeCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('like'),
        async ({likeCreated: root}, {post_id}, {user}) =>
          PostService.resolvePost(root, user).then(
            post => !!post && String(post._id) === String(post_id),
          ),
      ),
    },
    likeDeleted: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('like'),
        async ({likeDeleted: root}, {post_id}, {user}) =>
          PostService.resolvePost(root, user).then(
            post => !!post && String(post._id) === String(post_id),
          ),
      ),
    },
  },
}
