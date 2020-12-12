import {
  Post,
  PostDbObject,
  SubscriptionPostsUpdatedArgs,
  SubscriptionPostUpdatedArgs,
  UserDbObject,
} from '@skyflux/api/models/types'
import {PostService} from '@skyflux/api/models/post'
import {areEntitiesEqual} from '@skyflux/api/utils/areEntitiesEqual'

export const filterPostUpdated = async (
  {postUpdated}: {postUpdated?: Post | PostDbObject},
  {_id}: SubscriptionPostUpdatedArgs,
  {user}: {user?: UserDbObject},
): Promise<boolean> =>
  !!postUpdated &&
  areEntitiesEqual(_id, postUpdated) &&
  PostService.canSeePost(postUpdated, user)

export const filterPostsUpdated = async (
  {postsUpdated}: {postsUpdated?: Post | PostDbObject},
  {ownerId}: SubscriptionPostsUpdatedArgs,
  {user}: {user?: UserDbObject},
): Promise<boolean> =>
  !!postsUpdated &&
  areEntitiesEqual(ownerId, postsUpdated.user) &&
  PostService.canSeePost(postsUpdated, user)

export const filterFeedUpdated = async (
  {feedUpdated}: {feedUpdated?: Post | PostDbObject},
  _: unknown,
  {user}: {user?: UserDbObject},
): Promise<boolean> =>
  !!feedUpdated && !!user && PostService.isInFeed(feedUpdated, user)
