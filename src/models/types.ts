import {Document} from 'mongoose'

export type ID = Document['_id']

export interface Entity {
  _id: ID
}

export interface Edge<T extends Entity> {
  cursor: ID
  node: T
}

export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: string
  endCursor?: string
}

export interface Connection<T extends Entity> {
  edges: Edge<T>[]
  pageInfo: PageInfo
}
