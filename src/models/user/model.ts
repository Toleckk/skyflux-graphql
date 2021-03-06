import Mongoose, {Document} from 'mongoose'
import fuzzySearching from 'mongoose-fuzzy-searching'
import {UserDbObject} from '@skyflux/api/models/types'

const Description = new Mongoose.Schema({
  about: Mongoose.Schema.Types.String,
  birthday: Mongoose.Schema.Types.Date,
  from: Mongoose.Schema.Types.String,
})

const schema = new Mongoose.Schema({
  nickname: {type: Mongoose.Schema.Types.String, required: true, unique: true},
  avatar: {type: Mongoose.Schema.Types.String},
  description: {type: Description, required: true, default: {}},
  private: {
    type: Mongoose.Schema.Types.Boolean,
    required: true,
    default: false,
  },
})

schema.plugin(fuzzySearching, {fields: ['nickname']})

export const UserModel = Mongoose.model<UserDbObject & Document>('User', schema)
