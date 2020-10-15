import {withFilter} from 'apollo-server'
import {a, auth, injectArgs, injectRoot, paginate, validate} from '@decorators'
import {pubsub} from '@pubsub'
import {UserService} from '@models/user'
import {PostService} from '@models/post'
import {Comment} from './types'
import * as CommentService from './service'

const subscribe = (name: string) =>
  withFilter(
    (): AsyncIterator<Comment> => pubsub.asyncIterator('comment'),
    a([auth({passOnly: true}), injectRoot(), injectArgs()])(
      async ({root: {[name]: root}, post_id, user}): Promise<boolean> =>
        PostService.resolvePost({root, user}).then(
          post => !!post && String(post._id) === post_id,
        ),
    ),
  )

export const CommentResolver = {
  Mutation: {
    createComment: a([injectArgs(), auth(), validate()])(
      CommentService.createComment,
    ),
    deleteComment: a([injectArgs(), auth()])(CommentService.deleteComment),
  },
  Subscription: {
    commentCreated: {
      subscribe: subscribe('commentCreated'),
    },
    commentDeleted: {
      subscribe: subscribe('commentDeleted'),
    },
  },
  Query: {
    getCommentsByPostId: a([injectArgs(), paginate()])(
      CommentService.getCommentsByPostId,
    ),
  },
  Comment: {
    user: a([injectRoot()])(({root}) => UserService.resolveUser({root})),
    post: a([injectRoot(), auth({passOnly: true})])(({root, user}) =>
      PostService.resolvePost({root, user}),
    ),
  },
}
