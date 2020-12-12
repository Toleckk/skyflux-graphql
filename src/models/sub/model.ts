import Mongoose from 'mongoose'
import MongooseDeletePlugin, {
  SoftDeleteDocument,
  SoftDeleteModel,
} from 'mongoose-delete'
import {SubDbObject} from '@skyflux/api/models/types'

const schema = new Mongoose.Schema({
  from: {type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  to: {type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  accepted: {type: Mongoose.Schema.Types.Boolean, required: true},
})

schema.plugin(MongooseDeletePlugin, {deletedAt: true, overrideMethods: true})
schema.index({from: 1, to: 1, deletedAt: 1}, {unique: true})

export const SubModel = Mongoose.model<
  SubDbObject & SoftDeleteDocument,
  SoftDeleteModel<SubDbObject & SoftDeleteDocument>
>('Sub', schema)
