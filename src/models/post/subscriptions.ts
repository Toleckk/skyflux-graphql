import {pubsub} from '@pubsub'
import {
  Post,
  PostDbObject,
  SubscriptionPostsUpdatedArgs,
  SubscriptionPostUpdatedArgs,
  UserDbObject,
} from '@models/types'
import {notifyUserChanged, UserService} from '@models/user'
import {PostService} from '@models/post'
import {areEntitiesEqual} from '@utils/areEntitiesEqual'

export const notifyPostChanged = (
  post: PostDbObject | Post,
): Promise<[void, void]> =>
  Promise.all([
    pubsub.publish('post', {
      postUpdated: post,
      postsUpdated: post,
      feedUpdated: post,
    }),
    UserService.resolveUser(post).then(user =>
      user ? notifyUserChanged(user) : undefined,
    ),
  ])

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
