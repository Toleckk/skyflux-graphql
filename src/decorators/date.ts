import {
  always,
  anyPass,
  assocPath,
  converge,
  empty,
  invoker,
  is,
  nthArg,
  path,
  pipe,
  unless,
} from 'ramda'
import {Decorator} from './types'

export const date = (config: {paths: string[][]}): Decorator => (
  _,
  args,
): Record<string, any> => formatPaths(config.paths, args)

export const formatPaths = (
  paths: string[][],
  obj: Record<string, any>,
): Record<string, any> => {
  if (!paths.length) return obj

  const [path, ...rest] = paths
  return formatPaths(rest, pathToUTCDate(path, obj))
}

export const dateOf = (value: string | number | Date): Date => new Date(value)

export const toUTCDate: (date: string | Date) => Date = unless(
  anyPass([is(Date), empty as (v: string | Date) => v is '']),
  pipe(
    dateOf,
    converge(Date.UTC, [
      invoker(0, 'getFullYear'),
      invoker(0, 'getMonth'),
      invoker(0, 'getDate'),
      always(11),
    ]),
    dateOf,
  ),
)

export const pathToUTCDate: <T extends Record<string, any>>(
  path: string[],
  obj: T,
) => T = converge(assocPath, [nthArg(0), pipe(path, toUTCDate), nthArg(1)])
