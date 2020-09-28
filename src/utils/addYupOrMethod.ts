import * as yup from 'yup'

export const addYupOrMethod = (): void => {
  yup.addMethod(yup.string, 'or', function (schemas, msg) {
    return (this as yup.StringSchema).test({
      name: 'or',
      message: msg || 'Please enter valid nickname or email',
      test: value => {
        if (!Array.isArray(schemas) || schemas.length <= 1)
          throw new TypeError('Schemas is not correct array schema')

        return schemas
          .map(schema => schema.isValidSync(value))
          .some(res => !!res)
      },
      exclusive: false,
    })
  })
}
