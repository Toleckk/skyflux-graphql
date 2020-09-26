import Mongoose, {Model} from 'mongoose'
import fuzzySearching from 'mongoose-fuzzy-searching'
import {PostDocument} from './types'

const schema = new Mongoose.Schema(
  {
    text: {type: Mongoose.Schema.Types.String, required: true},
    user_id: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {timestamps: {createdAt: true, updatedAt: false}},
)

schema.plugin(fuzzySearching, {fields: ['text']})

export const PostModel = Mongoose.model<PostDocument, Model<PostDocument>>(
  'Post',
  schema,
)
