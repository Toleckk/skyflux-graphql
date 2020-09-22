import {Decorator} from './types'

export const injectToken = (): Decorator => (
  _,
  __,
  {token}: {token?: string},
) => ({token})
