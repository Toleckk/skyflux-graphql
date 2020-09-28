import {__} from 'ramda'
import * as yup from 'yup'
import {UserInputError} from 'apollo-server'
import {validateSync} from '@utils/validateSync'
import {extractMessages, getValidationErrors, validate} from '../validate'

const schemas = {
  single: yup.string().min(2, 'min'),
  few: yup.string().min(2, 'min').matches(/^\d+$/, 'matches'),
  obj: yup.object().shape({
    single: yup.string().min(2, 'min'),
    few: yup.string().min(2, 'min').matches(/^\d+$/, 'matches'),
  }),
}

const validArgs = {}

const invalidArgs = {single: '1', few: 'a', obj: {single: '1', few: 'a'}}

const validErrors = {
  single: ['min'],
  few: ['min', 'matches'],
  'obj.single': ['min'],
  'obj.few': ['min', 'matches'],
}

describe('extractMessages', function () {
  const schema = yup.object().shape(schemas)

  const validateSchema = validateSync(schema, __, {abortEarly: false})

  it('should return empty object if undefined is passed', function () {
    const errors = validateSchema(validArgs)
    const messages = extractMessages(errors)
    expect(messages).toEqual({})
  })

  it('should return errors messages grouped by field name', function () {
    const errors = validateSchema(invalidArgs)
    const messages = extractMessages(errors)
    expect(messages).toEqual(validErrors)
  })
})

describe('getValidationErrors', function () {
  it('should return empty object if there is no errors', function () {
    const errors = getValidationErrors(schemas, validArgs)

    expect(errors).toEqual({})
  })

  it('should return errors grouped by field names', function () {
    const errors = getValidationErrors(schemas, invalidArgs)

    expect(errors).toEqual(validErrors)
  })
})

describe('validate', function () {
  const validateSchema = validate({schemas})

  it('should return empty object if there is no errors', function () {
    const result = validateSchema({}, validArgs)
    expect(result).toEqual({})
  })

  it('should throw an error if there is errors', function () {
    expect.assertions(3)

    try {
      validateSchema({}, invalidArgs)
    } catch (e) {
      const message = getValidationErrors(schemas, invalidArgs)
      expect(e).toBeInstanceOf(UserInputError)
      expect(e.message).toBe('Validation error')
      expect(e.extensions).toEqual(expect.objectContaining(message))
    }
  })
})
