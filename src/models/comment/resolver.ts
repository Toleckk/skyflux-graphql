import {withFilter} from 'apollo-server'
import {pubsub} from '@skyflux/api/pubsub'
import {UserService} from '@skyflux/api/models/user'
import {PostService} from '@skyflux/api/models/post'
import {
  CommentResolvers,
  DeletedCommentResolvers,
  MaybeCommentResolvers,
  MutationResolvers,
  QueryResolvers,
  Resolvers,
  SubscriptionResolvers,
} from '@skyflux/api/models/types'
import {paginate} from '@skyflux/api/utils/paginate'
import {filterCommentUpdated} from './subscriptions'
import * as CommentService from './service'

export const CommentResolver: Resolvers = {
  Comment: <CommentResolvers>{
    user: comment => UserService.resolveUser(comment),
    post: (comment, _, {user}) => PostService.resolvePost(comment, user),
  },
  DeletedComment: <DeletedCommentResolvers>{
    post: (comment, _, {user}) => PostService.resolvePost(comment, user),
  },
  MaybeComment: <MaybeCommentResolvers>{
    __resolveType: parent =>
      'deleted' in parent && parent.deleted ? 'DeletedComment' : 'Comment',
  },
  Query: <QueryResolvers>{
    comments: (_, {post_id, first, after}) =>
      paginate((first, after) =>
        CommentService.getCommentsByPostId(post_id, first, after),
      )(first, after),
  },
  Mutation: <MutationResolvers>{
    createComment: (_, {comment: {text, post_id}}, {user}) =>
      CommentService.createComment(text, post_id, user),
    deleteComment: (_, {_id}, {user}) =>
      CommentService.deleteComment(_id, user),
  },
  Subscription: <SubscriptionResolvers>{
    commentUpdated: {
      subscribe: withFilter(
        (): AsyncIterator<Comment> => pubsub.asyncIterator('comment'),
        filterCommentUpdated,
      ),
    },
  },
}
