import Mongoose, {Document, Model} from 'mongoose'
import fuzzySearching from 'mongoose-fuzzy-searching'
import MongooseDeletePlugin, {SoftDeleteModel} from 'mongoose-delete'
import {PostDbObject} from '@skyflux/api/models/types'

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

schema.plugin(MongooseDeletePlugin, {
  deletedAt: true,
  overrideMethods: ['count', 'countDocuments', 'findOne', 'update'],
})

schema.plugin(fuzzySearching, {fields: ['text']})

export const PostModel = Mongoose.model<
  PostDbObject & Document,
  Model<PostDbObject & Document> & SoftDeleteModel<PostDbObject & Document>
>('Post', schema)
