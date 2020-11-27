import {
  SubscriptionUserUpdatedArgs,
  User,
  UserDbObject,
} from '@skyflux/api/models/types'
import {pubsub} from '@skyflux/api/pubsub'
import {areEntitiesEqual} from '@skyflux/api/utils/areEntitiesEqual'

export const notifyUserChanged = (
  user: UserDbObject | Partial<User>,
): Promise<void> => pubsub.publish('user', {userUpdated: user})

export const filterUserUpdated = (
  {userUpdated}: {userUpdated?: User | UserDbObject},
  {_id}: SubscriptionUserUpdatedArgs,
): boolean => !!userUpdated && areEntitiesEqual(_id, userUpdated)
