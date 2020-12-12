import {
  Sub,
  SubDbObject,
  SubscriptionSubsUpdatedArgs,
  UserDbObject,
} from '@skyflux/api/models/types'
import {areEntitiesEqual} from '@skyflux/api/utils/areEntitiesEqual'

export const filterSubsUpdated = async (
  {subsUpdated}: {subsUpdated?: Sub | SubDbObject},
  {from, to}: SubscriptionSubsUpdatedArgs,
  {user}: {user?: UserDbObject},
): Promise<boolean> => {
  if (!subsUpdated) return false

  if (!from && !to)
    return (
      areEntitiesEqual(user, subsUpdated.from) ||
      areEntitiesEqual(user, subsUpdated.to)
    )

  if (subsUpdated.accepted)
    return (
      areEntitiesEqual(from, subsUpdated.from) ||
      areEntitiesEqual(to, subsUpdated.to)
    )

  return (
    (areEntitiesEqual(user, from) || areEntitiesEqual(user, to)) &&
    (areEntitiesEqual(from, subsUpdated.from) ||
      areEntitiesEqual(to, subsUpdated.to))
  )
}
