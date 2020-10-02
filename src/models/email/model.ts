import Mongoose, {Model} from 'mongoose'
import {EmailDocument} from './types'

const schema = new Mongoose.Schema(
  {
    user_id: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    token: {type: Mongoose.Schema.Types.String, required: true, unique: true},
    email: {type: Mongoose.Schema.Types.String, required: true, unique: true},
  },
  {timestamps: {createdAt: true, updatedAt: false}},
)

export const EmailModel = Mongoose.model<EmailDocument, Model<EmailDocument>>(
  'Email',
  schema,
)
