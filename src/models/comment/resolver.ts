import {applySpec, nthArg, path, pipe, prop} from 'ramda'
import * as CommentService from './service'

export const CommentResolver = {
  Mutation: {
    createComment: pipe(
      applySpec({
        text: pipe(nthArg(1), prop<'text', string>('text')),
        post_id: pipe(nthArg(1), prop<'post_id', string>('post_id')),
        user_id: pipe(nthArg(2), path(['user', '_id'])),
      }),
      CommentService.createComment,
    ),
    deleteComment: pipe(
      applySpec({
        _id: pipe(nthArg(1), prop<'_id', string>('_id')),
        user_id: pipe(nthArg(2), path(['user', '_id'])),
      }),
      CommentService.deleteComment,
    ),
  },
}
