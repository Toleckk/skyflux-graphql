import {pubsub} from '@skyflux/api/pubsub'
import {
  Comment,
  CommentDbObject,
  DeletedComment,
  Post,
  PostDbObject,
  SubscriptionCommentUpdatedArgs,
  UserDbObject,
} from '@skyflux/api/models/types'
import {PostService} from '@skyflux/api/models/post'
import {areEntitiesEqual} from '@skyflux/api/utils/areEntitiesEqual'

export const notifyCommentChanged = (
  comment: Omit<CommentDbObject | DeletedComment, 'post'> & {
    post: PostDbObject | Partial<Post>
  },
): Promise<void[]> =>
  Promise.all([
    pubsub.publish('comment', {
      commentUpdated: comment,
      commentsUpdated: comment,
    }),
    pubsub.publish('post', {
      postUpdated: comment.post,
      postsUpdated: comment.post,
    }),
  ])

export const filterCommentUpdated = async (
  {commentUpdated}: {commentUpdated?: Comment | CommentDbObject},
  {post_id}: SubscriptionCommentUpdatedArgs,
  {user}: {user?: UserDbObject},
): Promise<boolean> => {
  if (!commentUpdated) return false

  if (!areEntitiesEqual(commentUpdated, post_id)) return false

  return !!(await PostService.resolvePost(commentUpdated, user))
}
