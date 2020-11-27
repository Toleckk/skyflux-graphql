import '@skyflux/api/_types/yupyflux/api/_types/yup'

declare module '@skyflux/api/_types/yup' {
  export interface StringSchema<
    T extends string | null | undefined = string | undefined,
    C = Record<string, unknown>
  > {
    or(schemas: StringSchema[], msg: string): StringSchema<T, C>
  }
}
