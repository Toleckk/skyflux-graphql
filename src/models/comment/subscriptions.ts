import {
  Comment,
  CommentDbObject,
  SubscriptionCommentUpdatedArgs,
  UserDbObject,
} from '@skyflux/api/models/types'
import {PostService} from '@skyflux/api/models/post'
import {areEntitiesEqual} from '@skyflux/api/utils/areEntitiesEqual'

export const filterCommentUpdated = async (
  {commentUpdated}: {commentUpdated?: Comment | CommentDbObject},
  {post_id}: SubscriptionCommentUpdatedArgs,
  {user}: {user?: UserDbObject},
): Promise<boolean> => {
  if (!commentUpdated) return false

  if (!areEntitiesEqual(commentUpdated.post, post_id)) return false

  return !!(await PostService.resolvePost(commentUpdated, user))
}
