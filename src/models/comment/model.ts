import Mongoose, {Document, Model} from 'mongoose'
import {CommentDbObject} from '@models/types'

const schema = new Mongoose.Schema(
  {
    text: {type: Mongoose.Schema.Types.String, required: true},
    post: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {timestamps: {createdAt: true, updatedAt: false}},
)

export const CommentModel = Mongoose.model<
  CommentDbObject & Document,
  Model<CommentDbObject & Document>
>('Comment', schema)
