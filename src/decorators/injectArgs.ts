import {pick} from 'ramda'
import {Decorator} from './types'

export const injectArgs = (config?: {args: string[]}): Decorator => (_, args) =>
  config ? pick(config.args, args) : args
