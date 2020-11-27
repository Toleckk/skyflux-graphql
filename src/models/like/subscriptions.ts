import {pubsub} from '@pubsub'
import {
  Like,
  LikeDbObject,
  SubscriptionLikeUpdatedArgs,
  UserDbObject,
} from '@models/types'
import {notifyPostChanged, PostService} from '@models/post'
import {areEntitiesEqual} from '@utils/areEntitiesEqual'

export const notifyLikeChanged = async (
  like: Like | LikeDbObject,
): Promise<void> => {
  await Promise.all([
    pubsub.publish('like', {likeUpdated: like}),
    PostService.resolvePost(like, undefined, true).then(
      post => !!post && notifyPostChanged(post),
    ),
  ])
}

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
