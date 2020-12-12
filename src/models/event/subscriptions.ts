import {Event, EventDbObject, UserDbObject} from '@skyflux/api/models/types'
import {ChannelService} from '@skyflux/api/models/channel'
import {areEntitiesEqual} from '@skyflux/api/utils/areEntitiesEqual'

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
