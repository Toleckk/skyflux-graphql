import {
  SubscriptionUserUpdatedArgs,
  User,
  UserDbObject,
} from '@skyflux/api/models/types'
import {areEntitiesEqual} from '@skyflux/api/utils/areEntitiesEqual'

export const filterUserUpdated = (
  {userUpdated}: {userUpdated?: User | UserDbObject},
  {_id}: SubscriptionUserUpdatedArgs,
): boolean => !!userUpdated && areEntitiesEqual(_id, userUpdated)
