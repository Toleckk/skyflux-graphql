import Mongoose, {Model} from 'mongoose'
import {SubDocument} from '@models/sub/types'

const schema = new Mongoose.Schema({
  from_id: {type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  to_id: {type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
})

schema.index({from_id: 1, to_id: 1}, {unique: true})

export const SubModel = Mongoose.model<SubDocument, Model<SubDocument>>(
  'Sub',
  schema,
)
