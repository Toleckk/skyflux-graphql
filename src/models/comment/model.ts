import Mongoose, {Model} from 'mongoose'
import {CommentDocument} from './types'

const schema = new Mongoose.Schema(
  {
    text: {type: Mongoose.Schema.Types.String, required: true},
    post_id: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
    user_id: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {timestamps: {createdAt: true, updatedAt: false}},
)

export const CommentModel = Mongoose.model<
  CommentDocument,
  Model<CommentDocument>
>('Comment', schema)
