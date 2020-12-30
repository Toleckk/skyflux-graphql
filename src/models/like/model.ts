import Mongoose, {Model, Document} from 'mongoose'
import MongooseDeletePlugin, {
  SoftDeleteDocument,
  SoftDeleteModel,
} from 'mongoose-delete'
import {LikeDbObject} from '@skyflux/api/models/types'

const schema = new Mongoose.Schema({
  post: {type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'Post'},
  user: {type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
})

schema.plugin(MongooseDeletePlugin, {
  deletedAt: true,
  overrideMethods: ['countDocuments', 'findOne'],
})

schema.index({post: 1, user: 1, deletedAt: 1}, {unique: true})

export const LikeModel = Mongoose.model<
  LikeDbObject & SoftDeleteDocument & Document,
  Model<LikeDbObject & SoftDeleteDocument & Document> &
    SoftDeleteModel<LikeDbObject & SoftDeleteDocument & Document>
>('Like', schema)
