import 'yup'

declare module 'yup' {
  export interface StringSchema<
    T extends string | null | undefined = string | undefined,
    C = Record<string, unknown>
  > {
    or(schemas: StringSchema[], msg: string): StringSchema<T, C>
  }
}
