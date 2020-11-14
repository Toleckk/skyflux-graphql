import Mongoose, {Document, Model} from 'mongoose'
import {LikeDbObject} from '@models/types'

const schema = new Mongoose.Schema({
  post: {type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'Post'},
  user: {type: Mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
})

schema.index({post: 1, user: 1}, {unique: true})

export const LikeModel = Mongoose.model<
  LikeDbObject & Document,
  Model<LikeDbObject & Document>
>('Like', schema)
