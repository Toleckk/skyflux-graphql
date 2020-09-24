import {Event, EventType, SubEventBody} from '@models/event'
import {SubDocument} from './types'

export const subRequested = ({
  sub,
}: {
  sub: SubDocument
}): Omit<Event<SubEventBody>, '_id'> => ({
  kind: EventType.Sub,
  channel: `Sub_${sub.to_id}`,
  subj: {sub_id: sub._id},
})
