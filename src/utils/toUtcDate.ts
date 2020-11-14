import {
  always,
  anyPass,
  converge,
  invoker,
  isEmpty,
  isNil,
  pipe,
  unless,
} from 'ramda'

export const dateOf = (value: string | number | Date): Date => new Date(value)

export const toUTCDate: (date?: string | Date) => Date = unless(
  anyPass([isNil, isEmpty]),
  pipe(
    dateOf as (value?: string | number | Date) => Date,
    converge(Date.UTC, [
      invoker(0, 'getFullYear'),
      invoker(0, 'getMonth'),
      invoker(0, 'getDate'),
      always(11),
    ]),
    dateOf,
  ),
)
