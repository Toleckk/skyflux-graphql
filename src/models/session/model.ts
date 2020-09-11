import Mongoose, {Model} from 'mongoose'
import {SessionDocument} from '@models/session/types'

const schema = new Mongoose.Schema({
  user_id: {type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  token: {type: Mongoose.Schema.Types.String, required: true},
})

export const SessionModel = Mongoose.model<
  SessionDocument,
  Model<SessionDocument>
>('Session', schema)
