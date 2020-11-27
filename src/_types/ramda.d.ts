import {Placeholder} from 'ramda'

declare module 'ramda' {
  export function apply<U>(
    placeholder: Placeholder,
    args: readonly U[],
  ): <TResult, T>(fn: (...args: readonly T[]) => TResult) => TResult
}
