import Mongoose, {Document, Model} from 'mongoose'
import {ChannelDocument} from '@skyflux/api/models/channel/types'

const schema = new Mongoose.Schema(
  {
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    channelRegex: {type: Mongoose.Schema.Types.String, required: true},
  },
  {timestamps: {createdAt: true, updatedAt: false}},
)

schema.index({user: 1, channelRegex: 1}, {unique: true})

export const ChannelModel = Mongoose.model<
  ChannelDocument & Document,
  Model<ChannelDocument & Document>
>('Channel', schema)
