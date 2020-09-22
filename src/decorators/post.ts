import {Decorator, PostSymbol} from './types'

export const post = <T extends Decorator, G extends T = T>(decorator: T): G => {
  const postDecorator = decorator.bind(decorator) as G
  postDecorator[PostSymbol] = true
  return postDecorator
}
