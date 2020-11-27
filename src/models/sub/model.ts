import Mongoose, {Document, Model} from 'mongoose'
import {SubDbObject} from '@skyflux/api/models/types'

const schema = new Mongoose.Schema({
  from: {type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  to: {type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  accepted: {type: Mongoose.Schema.Types.Boolean, required: true},
})

schema.index({from: 1, to: 1}, {unique: true})

export const SubModel = Mongoose.model<
  SubDbObject & Document,
  Model<SubDbObject & Document>
>('Sub', schema)
