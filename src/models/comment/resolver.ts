import {a, auth, injectArgs, injectRoot, paginate} from '@decorators'
import {UserService} from '@models/user'
import {PostService} from '@models/post'
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
  Comment: {
    user: a([injectRoot()])(UserService.resolverUser),
    post: a([injectRoot()])(PostService.resolvePost),
  },
}
