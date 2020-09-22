import {a, auth, injectArgs, paginate} from '@decorators'
import * as CommentService from './service'

export const CommentResolver = {
  Mutation: {
    createComment: a([injectArgs(), auth()])(CommentService.createComment),
    deleteComment: a([injectArgs(), auth()])(CommentService.deleteComment),
  },
  Query: {
    getCommentsByPostId: a([injectArgs(), paginate()])(
      CommentService.getCommentsByPostId,
    ),
  },
}
