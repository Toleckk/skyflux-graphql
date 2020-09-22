export const PostSymbol: unique symbol = Symbol()

export type Obj = Record<string, any>

export type Decorator = {[PostSymbol]?: boolean} & ((
  ...args: any[]
) => Obj | Promise<Obj>)

export type Fn = (...args: any[]) => any

export type Decorate = (
  fns: Decorator[],
) => (resolver: Fn) => (...args: any[]) => Promise<any>

export type ApplyDecorators = (
  args: any[],
  decorators: Decorator[],
) => Promise<Obj>
