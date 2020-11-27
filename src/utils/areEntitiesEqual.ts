import Mongoose from 'mongoose'
import {isMongoId} from '@utils/isMongoId'

export const areEntitiesEqual = (a: Comparable, b: Comparable): boolean => {
  if ((a || null) === (b || null)) return true

  if (!a || !b) return false

  if (isId(a) && isId(b)) return String(a) === String(b)

  if (isEntity(a) && isEntity(b)) return String(a._id) === String(b._id)

  if (isEntity(a) && isId(b)) return String(a._id) === String(b)

  if (isEntity(b) && isId(a)) return String(a) === String(b._id)

  return false
}

const isId = (a: unknown): a is string | Mongoose.Types.ObjectId =>
  typeof a === 'string' || isMongoId(a)

const isEntity = (a: unknown): a is {_id: string | Mongoose.Types.ObjectId} =>
  typeof a === 'object' &&
  !!a &&
  '_id' in a &&
  (isMongoId((a as Entity)._id) || typeof (a as Entity)._id === 'string')

type Entity = {
  _id: string | Mongoose.Types.ObjectId
}

type Comparable = undefined | null | string | Mongoose.Types.ObjectId | Entity
