import {
  applySpec,
  complement,
  gt,
  head,
  identity,
  ifElse,
  isNil,
  last,
  length,
  map,
  nthArg,
  pipe,
  prop,
  propSatisfies,
  useWith,
  when,
} from 'ramda'
import {Connection, Edge, Entity, ID, PageInfo} from '@models/types'
import {Decorator} from './types'
import {post} from './post'

export const paginate = (): Decorator =>
  post(
    <T extends Entity>(
      [, {first, after}]: [unknown, {first?: number; after?: string}],
      entities: T[],
    ): Connection<T> => {
      const edges = toEdges(entities).slice(0, first || entities.length)

      return {
        edges,
        pageInfo: createPageInfo(entities, edges, after),
      }
    },
  )

export const toEdges: <T extends Entity>(entities: T[]) => Edge<T>[] = pipe(
  map(
    applySpec({
      node: identity,
      cursor: ifElse(
        propSatisfies(complement(isNil), '__cursor'),
        prop('__cursor'),
        prop('_id'),
      ),
    }),
  ),
)

export const getCursor: <T extends Entity>(entity?: T) => ID | undefined = when(
  complement(isNil),
  prop('cursor'),
)

export const createPageInfo: <T extends Entity>(
  entities: T[],
  edges: Edge<T>[],
  after?: string,
) => PageInfo = applySpec({
  hasNextPage: useWith(gt, [length, length]),
  hasPreviousPage: pipe(nthArg(2), Boolean),
  startCursor: pipe(nthArg(1), head as (e: Entity[]) => Entity, getCursor),
  endCursor: pipe(nthArg(1), last as (e: Entity[]) => Entity, getCursor),
})
