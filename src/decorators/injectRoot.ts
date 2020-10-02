import {Decorator} from './types'

export const injectRoot = (
  config: {as: string} = {as: 'root'},
): Decorator => source => ({[config.as]: source})
