import {a, auth, injectArgs, injectRoot, paginate, validate} from '@decorators'
import {UserService} from '@models/user'
import {PostService} from '@models/post'
import * as CommentService from './service'

export const CommentResolver = {
  Mutation: {
    createComment: a([injectArgs(), auth(), validate()])(
      CommentService.createComment,
    ),
    deleteComment: a([injectArgs(), auth()])(CommentService.deleteComment),
  },
  Query: {
    getCommentsByPostId: a([injectArgs(), paginate()])(
      CommentService.getCommentsByPostId,
    ),
  },
  Comment: {
    user: a([injectRoot()])(({root}) => UserService.resolveUser({root})),
    post: a([injectRoot()])(({root}) => PostService.resolvePost({root})),
  },
}
