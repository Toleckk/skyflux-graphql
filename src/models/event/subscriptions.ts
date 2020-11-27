import {Event, EventDbObject, UserDbObject} from '@skyflux/api/models/types'
import {pubsub} from '@skyflux/api/pubsub'
import {ChannelService} from '@skyflux/api/models/channel'
import {areEntitiesEqual} from '@skyflux/api/utils/areEntitiesEqual'

export const notifyEventChanged = (
  event: EventDbObject | Partial<Event>,
): Promise<void> => pubsub.publish('event', {eventUpdated: event})

export const filterEventUpdated = async (
  {
    eventUpdated,
  }: {
    eventUpdated?: (Event | EventDbObject) & {
      channel: string
      emitter: string | UserDbObject
    }
  },
  _: unknown,
  {user}: {user?: UserDbObject},
): Promise<boolean> =>
  !!eventUpdated &&
  !!user &&
  !areEntitiesEqual(eventUpdated.emitter, user) &&
  ChannelService.isUserSubscribedToChannel(eventUpdated.channel, user)
