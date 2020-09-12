import Mongoose, {Model} from 'mongoose'
import {PostDocument} from './types'

const schema = new Mongoose.Schema({
  text: {type: Mongoose.Schema.Types.String, required: true},
  user_id: {type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
})

export const PostModel = Mongoose.model<PostDocument, Model<PostDocument>>(
  'Post',
  schema,
)
