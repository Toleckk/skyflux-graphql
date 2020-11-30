import {SchemaDirectiveVisitor} from 'graphql-tools'
import {
  defaultFieldResolver,
  GraphQLInputObjectType,
  GraphQLNonNull,
  isInputObjectType,
  StringValueNode,
} from 'graphql'
import {
  assocPath,
  filter,
  isEmpty,
  mapObjIndexed,
  mergeDeepRight,
  pathEq,
  values,
} from 'ramda'
import {ValidationError} from '@skyflux/api/errors'
import {
  Create,
  CreateValidateDirective,
  ExtractValidators,
  FieldsOf,
  FilterValidatedMutations,
  GetDirectiveParams,
  IsInput,
  IsValidatedArg,
  IsValidatedMutation,
  Params,
  ValidateAll,
  ValidateDirectiveConfig,
} from './types'

export const VALIDATED_RESOLVER: unique symbol = Symbol()

export const createValidateDirective: CreateValidateDirective = (config = {}) =>
  class ValidateDirective extends SchemaDirectiveVisitor {
    visitArgumentDefinition() {
      return this.validateMutations()
    }

    visitInputFieldDefinition() {
      return this.validateMutations()
    }

    validateMutations(): void {
      const mutations = this.schema.getMutationType()?.getFields() || {}
      const validatedMutations = values(filterValidatedMutations(mutations))

      validatedMutations.forEach(mutation => {
        if (VALIDATED_RESOLVER in mutation) return

        const validateArgs = create(config, mutation)
        const {resolve = defaultFieldResolver} = mutation

        mutation.resolve = (root, args, ...rest) => {
          const errors = validateArgs(args)

          if (!isEmpty(errors)) throw new ValidationError(errors)

          return resolve(root, args, ...rest)
        }

        Object.assign(mutation, {[VALIDATED_RESOLVER]: VALIDATED_RESOLVER})
      })
    }
  }

export const ValidateDirective = createValidateDirective()

export const create: Create = (config, mutation) => {
  const schema = mutation.args
    .map(e => extractValidators(e, config))
    .reduce(mergeDeepRight, {})

  return args => validateAll(args, schema)
}

export const validateAll: ValidateAll = (args, schema) => {
  return filter(
    e => !!e && !isEmpty(e),
    mapObjIndexed((value, key) => {
      const params = schema[key]

      if (
        typeof value === 'string' &&
        params &&
        'pattern' in params &&
        params.pattern instanceof RegExp
      )
        return params.pattern.test(value)
          ? undefined
          : params.error || 'Validation failed'

      if (typeof value === 'object' && !(params && 'pattern' in params))
        return validateAll(value, params as ValidateDirectiveConfig)
    }, args),
  )
}

export const extractValidators: ExtractValidators = (
  arg,
  config,
  path = [],
) => {
  if (
    !isInputObjectType(arg.type) &&
    (!('ofType' in arg.type) || !isInputObjectType(arg.type.ofType))
  ) {
    const directive = arg?.astNode?.directives?.find(
      directive => directive.name.value === 'validate',
    )

    if (!directive) return undefined

    const params = getDirectiveParams(directive, arg.type)
    const newPath = [...path, arg.name]
    const configParams: Params = newPath.reduce(
      (acc, cur) => (cur in acc ? acc[cur] : ({} as any)),
      config,
    )

    const allParams = mergeDeepRight(configParams, params)

    if (isEmpty(allParams)) return {}

    return assocPath(newPath, allParams, {})
  }

  const fields = fieldsOf(arg)
  return values(fields)
    .map(field => extractValidators(field, config, [...path, arg.name]))
    .filter(e => !isEmpty(e))
    .reduce(mergeDeepRight, {})
}

export const getDirectiveParams: GetDirectiveParams = (directive, type) => {
  const args = directive?.arguments || []
  const patternArg = args.find(pathEq(['name', 'value'], 'pattern'))
  const errorArg = args.find(pathEq(['name', 'value'], 'error'))

  const patternValue = patternArg?.value as StringValueNode | undefined
  const errorValue = errorArg?.value as StringValueNode | undefined

  const pattern =
    patternValue &&
    new RegExp(
      type instanceof GraphQLNonNull
        ? patternValue.value
        : makeNotRequiredRegex(patternValue.value),
    )
  const error = errorValue?.value

  return filter(e => !!e, {error, pattern})
}

export const makeNotRequiredRegex = (v: string): string => {
  const internalRegex = v.match(/^\/?(.+?)(?:\/?$)/)?.[1]

  return '(^$)|(' + (internalRegex || '') + ')'
}

export const isInput: IsInput = arg =>
  arg.type instanceof GraphQLInputObjectType ||
  ('ofType' in arg.type && arg.type.ofType instanceof GraphQLInputObjectType)

export const filterValidatedMutations: FilterValidatedMutations = mutations =>
  filter(isValidatedMutation, mutations)

export const isValidatedMutation: IsValidatedMutation = mutation =>
  mutation.args.some(isValidatedArg)

export const isValidatedArg: IsValidatedArg = arg =>
  isInput(arg)
    ? values(fieldsOf(arg)).some(isValidatedArg)
    : !!arg.astNode?.directives?.some(
        directive => directive.name.value === 'validate',
      )

export const fieldsOf: FieldsOf = arg =>
  'getFields' in arg
    ? arg.getFields()
    : 'getFields' in arg.type
    ? arg.type.getFields()
    : 'ofType' in arg.type
    ? arg.type.ofType.getFields()
    : {}
