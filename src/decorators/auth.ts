import {User} from '@models/user'
import {Decorator} from './types'

export const auth = (config?: {passOnly?: boolean}): Decorator => (
  _,
  __,
  {user}: {user?: User},
) => {
  if (!user && !config?.passOnly) throw new Error()

  return {user}
}
