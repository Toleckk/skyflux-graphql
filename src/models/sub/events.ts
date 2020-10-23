import {Event, EventType, SubEventBody} from '@models/event'
import {User} from '@models/user'
import {SubDocument} from './types'

export const subRequested = ({
  sub,
  user,
}: {
  sub: SubDocument
  user: User
}): Omit<Event<SubEventBody>, '_id'> => ({
  kind: EventType.Sub,
  channel: `Sub_${sub.to_id}`,
  subj: {sub_id: sub._id},
  emitter: user,
})
