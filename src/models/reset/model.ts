import Mongoose, {Model} from 'mongoose'
import {ResetDocument} from './types'

const schema = new Mongoose.Schema({
  token: {type: Mongoose.Schema.Types.String, required: true},
  user_id: {type: Mongoose.Schema.Types.String, required: true},
})

export const ResetModel = Mongoose.model<ResetDocument, Model<ResetDocument>>(
  'Reset',
  schema,
)
