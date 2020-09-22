import {
  andThen,
  apply,
  applyTo,
  flip,
  map,
  mergeDeepRight,
  partition,
  pipe,
  reduce,
  useWith,
} from 'ramda'
import {ApplyDecorators, Decorate, PostSymbol} from './types'

export const a: Decorate = fns => resolver => async (...args) => {
  const [post, pre] = partition(d => !!d[PostSymbol], fns)

  const preResult = await applyDecorators(args, pre)
  const resolverResult = await resolver(preResult)
  return post.length
    ? applyDecorators([args, resolverResult], post)
    : resolverResult
}

export const applyDecorators: ApplyDecorators = useWith(
  pipe(
    applyTo,
    Promise.all.bind(Promise),
    andThen(reduce(mergeDeepRight, Object())),
  ),
  [flip(apply), flip(map)],
)
