import {pubsub} from '@skyflux/api/pubsub'
import {
  DeletedSub,
  Sub,
  SubDbObject,
  SubscriptionSubsUpdatedArgs,
  UserDbObject,
} from '@skyflux/api/models/types'
import {notifyUserChanged} from '@skyflux/api/models/user'
import {isMongoId} from '@skyflux/api/utils/isMongoId'
import {areEntitiesEqual} from '@skyflux/api/utils/areEntitiesEqual'

export const notifySubChanged = (
  sub: Sub | SubDbObject | DeletedSub,
): Promise<void[]> =>
  Promise.all([
    pubsub.publish('sub', {subsUpdated: sub}),
    ...('accepted' in sub && sub.accepted
      ? [
          !isMongoId(sub.from) ? notifyUserChanged(sub.from) : undefined,
          !isMongoId(sub.to) ? notifyUserChanged(sub.to) : undefined,
        ]
      : []),
  ])

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
