import Mongoose from 'mongoose'

export const isMongoId = (id: unknown): id is Mongoose.Types.ObjectId =>
  id instanceof Mongoose.Types.ObjectId
