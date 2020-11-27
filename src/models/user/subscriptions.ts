import {SubscriptionUserUpdatedArgs, User, UserDbObject} from '@models/types'
import {pubsub} from '@pubsub'
import {areEntitiesEqual} from '@utils/areEntitiesEqual'

export const notifyUserChanged = (
  user: UserDbObject | Partial<User>,
): Promise<void> => pubsub.publish('user', {userUpdated: user})

export const filterUserUpdated = (
  {userUpdated}: {userUpdated?: User | UserDbObject},
  {_id}: SubscriptionUserUpdatedArgs,
): boolean => !!userUpdated && areEntitiesEqual(_id, userUpdated)
