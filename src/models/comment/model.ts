import Mongoose from 'mongoose'
import MongooseDeletePlugin, {
  SoftDeleteDocument,
  SoftDeleteModel,
} from 'mongoose-delete'
import {CommentDbObject} from '@skyflux/api/models/types'

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

schema.plugin(MongooseDeletePlugin, {overrideMethods: true, deletedAt: true})

export const CommentModel = Mongoose.model<
  CommentDbObject & SoftDeleteDocument,
  SoftDeleteModel<CommentDbObject & SoftDeleteDocument>
>('Comment', schema)
