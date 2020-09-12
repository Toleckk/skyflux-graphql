import Mongoose, {Model} from 'mongoose'
import {LikeDocument} from './types'

const schema = new Mongoose.Schema({
  post_id: {type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'Post'},
  user_id: {type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
})

schema.index({post_id: 1, user_id: 1}, {unique: true})

export const LikeModel = Mongoose.model<LikeDocument, Model<LikeDocument>>(
  'Like',
  schema,
)
