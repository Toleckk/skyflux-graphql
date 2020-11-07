import {
  __,
  always,
  chain,
  Dictionary,
  groupBy,
  identity,
  ifElse,
  isEmpty,
  isNil,
  mapObjIndexed,
  pipe,
  prop,
  useWith,
} from 'ramda'
import * as yup from 'yup'
import {ObjectSchema, Schema, ValidationError as TValidationError} from 'yup'
import {ValidationError} from '@errors'
import {validateSync} from '@utils/validateSync'
import * as validation from '@validation'
import {Decorator} from './types'

export const validate = (config?: {
  schemas?: Dictionary<Schema<any>>
}): Decorator => (_, args): Record<string, never> => {
  const {schemas = validation} = config || {}

  const errors = getValidationErrors(schemas, args)

  if (isEmpty(errors)) return {}

  throw new ValidationError(errors)
}

export const mergeSchemas = (schemas: Dictionary<Schema<any>>): ObjectSchema =>
  yup.object().shape(schemas)

export const extractMessages: (
  errors?: TValidationError,
) => Dictionary<string[]> = pipe(
  ifElse(isNil, always([]), prop('inner')),
  groupBy<TValidationError>(prop('path')),
  mapObjIndexed(chain(prop('errors'))),
)

export const getValidationErrors: (
  schemas: Dictionary<Schema<any>>,
  args: Dictionary<any>,
) => Dictionary<string[]> = useWith(
  pipe(validateSync(__, __, {abortEarly: false}), extractMessages),
  [mergeSchemas, identity],
)
