import Mongoose, {Model} from 'mongoose'
import {ChannelDocument} from '@models/channel/types'

const schema = new Mongoose.Schema(
  {
    user_id: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    channelRegex: {type: Mongoose.Schema.Types.String, required: true},
  },
  {timestamps: {createdAt: true, updatedAt: false}},
)

schema.index({user_id: 1, channelRegex: 1}, {unique: true})

export const ChannelModel = Mongoose.model<
  ChannelDocument,
  Model<ChannelDocument>
>('Channel', schema)
