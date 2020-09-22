import {Decorator} from './types'

export const injectRoot = (): Decorator => source => ({root: source})
