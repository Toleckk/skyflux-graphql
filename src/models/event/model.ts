import Mongoose, {Model} from 'mongoose'
import {EventDocument} from './types'

const schema = new Mongoose.Schema(
  {
    channel: {type: Mongoose.Schema.Types.String, required: true},
    kind: {type: Mongoose.Schema.Types.String, required: true},
    subj: {type: {}, required: true},
  },
  {timestamps: {createdAt: true, updatedAt: false}},
)

export const EventModel = Mongoose.model<EventDocument, Model<EventDocument>>(
  'Event',
  schema,
)
