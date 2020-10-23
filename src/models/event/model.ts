import Mongoose, {Model} from 'mongoose'
import {EventDocument} from './types'

const schema = new Mongoose.Schema(
  {
    channel: {type: Mongoose.Schema.Types.String, required: true},
    kind: {type: Mongoose.Schema.Types.String, required: true},
    subj: {type: {}, required: true},
    emitter_id: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {timestamps: {createdAt: true, updatedAt: false}},
)

export const EventModel = Mongoose.model<EventDocument, Model<EventDocument>>(
  'Event',
  schema,
)
