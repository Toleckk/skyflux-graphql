import {Schema, ValidateOptions, ValidationError} from 'yup'
import {curry, is} from 'ramda'

export const validateSync = curry(
  (
    schema: Schema<any> | undefined,
    value: unknown,
    options: ValidateOptions<Record<string, any>>,
  ): ValidationError | undefined => {
    try {
      schema?.validateSync(value, options)
    } catch (e) {
      if (is(ValidationError, e)) return e

      throw e
    }
  },
)
