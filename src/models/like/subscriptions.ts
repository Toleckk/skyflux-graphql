import {
  Like,
  LikeDbObject,
  SubscriptionLikeUpdatedArgs,
  UserDbObject,
} from '@skyflux/api/models/types'
import {PostService} from '@skyflux/api/models/post'
import {areEntitiesEqual} from '@skyflux/api/utils/areEntitiesEqual'

export const filterLikeUpdated = async (
  {likeUpdated}: {likeUpdated?: Like | LikeDbObject},
  {post_id}: SubscriptionLikeUpdatedArgs,
  {user}: {user?: UserDbObject},
): Promise<boolean> => {
  if (!likeUpdated) return false

  if (!areEntitiesEqual(post_id, likeUpdated.post)) return false

  const post = await PostService.resolvePost(likeUpdated, user)
  return !!post && String(post._id) === String(post_id)
}
