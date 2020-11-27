import 'mongoose'

declare module 'mongoose' {
  interface Document {
    deleteOne(
      options: {session: ClientSession},
      fn?: (err: any, product: this) => void,
    ): Promise<this>
  }
}
