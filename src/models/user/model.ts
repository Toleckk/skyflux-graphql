import Mongoose, {Model} from 'mongoose'
import {UserDocument} from '@models/user/types'

const schema = new Mongoose.Schema({
  email: {type: Mongoose.Schema.Types.String, required: true, unique: true},
  password: {type: Mongoose.Schema.Types.String, required: true},
  nickname: {type: Mongoose.Schema.Types.String, required: true, unique: true},
})

export const UserModel = Mongoose.model<UserDocument, Model<UserDocument>>(
  'User',
  schema,
)
