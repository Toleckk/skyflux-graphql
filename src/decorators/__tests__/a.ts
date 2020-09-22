import {mergeDeepRight} from 'ramda'
import {Decorator, PostSymbol} from '../types'
import {a} from '../a'

const pre = {pre: 'pre'}
const pre2 = {pre2: 'pre2'}
const preDecorator = jest.fn(() => pre)
const pre2Decorator = jest.fn(async () => pre2)

const post = {post: 'post'}
const post2 = {post2: 'post2'}
const postDecorator: jest.Mock & Decorator = jest.fn(() => post)
const post2Decorator: jest.Mock & Decorator = jest.fn(async () => post2)
postDecorator[PostSymbol] = true
post2Decorator[PostSymbol] = true

const resolverResult = {}
const resolver = jest.fn(() => resolverResult)

const args = {}

describe('a', function () {
  it('should return resolver result if no post decorators passed', async function () {
    const result = await a([preDecorator, pre2Decorator])(resolver)(args)
    expect(result).toBe(resolverResult)
  })

  it('should call decorators with fn args', async function () {
    const decoratedFn = a([preDecorator, pre2Decorator])(resolver)
    await decoratedFn(args)
    expect(preDecorator).toBeCalledWith(args)
    expect(pre2Decorator).toBeCalledWith(args)
  })

  it('should call resolver with pre decorators result', async function () {
    const decoratedFn = a([preDecorator])(resolver)
    await decoratedFn(args)
    expect(resolver).toBeCalledWith(expect.objectContaining({pre: 'pre'}))
  })

  it('should merge few pre decorators results', async function () {
    const decoratedFn = a([preDecorator, pre2Decorator])(resolver)
    await decoratedFn(args)
    expect(resolver).toBeCalledWith(
      expect.objectContaining(mergeDeepRight(pre, pre2)),
    )
  })

  it('should call decorators with resolver result and args', async function () {
    const decoratedFn = a([postDecorator, post2Decorator])(resolver)
    await decoratedFn(args)
    expect(postDecorator).toBeCalledWith([args], resolverResult)
    expect(post2Decorator).toBeCalledWith([args], resolverResult)
  })
})
