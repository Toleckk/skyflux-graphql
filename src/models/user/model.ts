import Mongoose, {Model} from 'mongoose'
import fuzzySearching from 'mongoose-fuzzy-searching'
import {UserDocument} from './types'

const Description = new Mongoose.Schema({
  about: Mongoose.Schema.Types.String,
  birthday: Mongoose.Schema.Types.Date,
  from: Mongoose.Schema.Types.String,
})

const schema = new Mongoose.Schema({
  email: {type: Mongoose.Schema.Types.String, required: true, unique: true},
  password: {type: Mongoose.Schema.Types.String, required: true},
  nickname: {type: Mongoose.Schema.Types.String, required: true, unique: true},
  avatar: {type: Mongoose.Schema.Types.String},
  description: {type: Description, required: true, default: {}},
})

schema.plugin(fuzzySearching, {fields: ['nickname']})

export const UserModel = Mongoose.model<UserDocument, Model<UserDocument>>(
  'User',
  schema,
)
