import {post} from '../post'
import {Decorator, PostSymbol} from '../types'

describe('post', function () {
  it('should not mutate initial object', function () {
    const decorator: Decorator = jest.fn()
    const postDecorator = post(decorator)

    expect(decorator).not.toBe(postDecorator)
  })

  it('should call decorator with origin params', function () {
    const decorator: Decorator = jest.fn()
    const postDecorator = post(decorator)

    const args = {}

    postDecorator(args)
    expect(decorator).toBeCalledWith(args)
  })

  it('should set PostSymbol to true', function () {
    const decorator: Decorator = jest.fn()
    const postDecorator = post(decorator)

    expect(postDecorator[PostSymbol]).toBe(true)
  })
})
