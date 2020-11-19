import {withFilter} from 'apollo-server'
import {pubsub} from '@pubsub'
import {UserService} from '@models/user'
import {PostService} from '@models/post'
import {
  CommentResolvers,
  DeletedCommentResolvers,
  MaybeCommentResolvers,
  MutationResolvers,
  QueryResolvers,
  Resolvers,
  SubscriptionResolvers,
} from '@models/types'
import {paginate} from '@utils/paginate'
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
      'deleted' in parent ? 'DeletedComment' : 'Comment',
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
        async ({commentUpdated}, {post_id}, {user}): Promise<boolean> =>
          PostService.resolvePost(commentUpdated, user).then(
            post => !!post && String(post._id) === post_id,
          ),
      ),
    },
  },
}
