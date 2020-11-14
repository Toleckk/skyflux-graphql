import Mongoose, {Document, Model} from 'mongoose'
import fuzzySearching from 'mongoose-fuzzy-searching'
import {PostDbObject} from '@models/types'

const schema = new Mongoose.Schema(
  {
    text: {type: Mongoose.Schema.Types.String, required: true},
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {timestamps: {createdAt: true, updatedAt: false}},
)

schema.plugin(fuzzySearching, {fields: ['text']})

export const PostModel = Mongoose.model<
  PostDbObject & Document,
  Model<PostDbObject & Document>
>('Post', schema)
