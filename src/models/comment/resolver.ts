import {withFilter} from 'apollo-server'
import {pubsub} from '@pubsub'
import {UserService} from '@models/user'
import {PostService} from '@models/post'
import {
  CommentResolvers,
  DeletedCommentResolvers,
  MutationResolvers,
  QueryResolvers,
  Resolvers,
  SubscriptionResolvers,
} from '@models/types'
import {paginate} from '@utils/paginate'
import * as CommentService from './service'

const subscribe = (name: string) =>
  withFilter(
    (): AsyncIterator<Comment> => pubsub.asyncIterator('comment'),
    async ({[name]: root}, {post_id}, {user}): Promise<boolean> =>
      PostService.resolvePost(root, user).then(
        post => !!post && String(post._id) === post_id,
      ),
  )

export const CommentResolver: Resolvers = {
  Comment: <CommentResolvers>{
    user: comment => UserService.resolveUser(comment),
    post: (comment, _, {user}) => PostService.resolvePost(comment, user),
  },
  DeletedComment: <DeletedCommentResolvers>{
    post: (comment, _, {user}) => PostService.resolvePost(comment, user),
  },
  Query: <QueryResolvers>{
    getCommentsByPostId: (_, {post_id, first, after}) =>
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
    commentCreated: {
      subscribe: subscribe('commentCreated'),
    },
    commentDeleted: {
      subscribe: subscribe('commentDeleted'),
    },
  },
}
