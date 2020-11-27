import Mongoose, {Document, Model} from 'mongoose'
import {EventDbObject} from '@skyflux/api/models/types'

const schema = new Mongoose.Schema(
  {
    channel: {type: Mongoose.Schema.Types.String, required: true},
    kind: {type: Mongoose.Schema.Types.String, required: true},
    subj: {type: {}, required: true},
    emitter: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {timestamps: {createdAt: true, updatedAt: false}},
)

export const EventModel = Mongoose.model<
  EventDbObject & Document,
  Model<EventDbObject & Document>
>('Event', schema)
