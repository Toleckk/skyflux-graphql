import {ObjectID} from 'mongodb'
import {PageInfo} from '@skyflux/api/models/types'

export type Edge<T, Cursor = string> = {
  node: T
  cursor: Cursor
}

export type Connection<T> = {
  edges: Edge<T>[]
  pageInfo: PageInfo
}

export type Paginatable = {
  _id: string | ObjectID
  __cursor?: string
}

export const paginate = <T extends Paginatable>(
  fn: (first: number, after?: string) => Promise<T[]> | T[],
) => async (
  first: number,
  after?: string | null,
): Promise<Connection<T & {_id: string}>> => {
  const result = await fn(first + 1, after || undefined)

  const edges = result.slice(0, first).map(node => ({
    node,
    cursor: String(node.__cursor || node._id),
  })) as Connection<T & {_id: string}>['edges']

  return {
    edges,
    pageInfo: {
      startCursor: edges?.[0]?.cursor,
      endCursor: edges?.[edges.length - 1]?.cursor,
      hasNextPage: result.length > first,
      hasPreviousPage: !!after,
    },
  }
}
