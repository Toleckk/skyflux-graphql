import {SchemaDirectiveVisitorClass} from 'graphql-tools'
import {
  DirectiveNode,
  GraphQLArgument,
  GraphQLField,
  GraphQLFieldMap,
  GraphQLInputField,
  GraphQLInputObjectType,
} from 'graphql'

export interface ValidateDirectiveConfig {
  [index: string]: ValidateDirectiveConfig | Params
}

export type Params = {
  pattern?: RegExp
  error?: string
}

export type CreateValidateDirective = (
  config?: ValidateDirectiveConfig,
) => SchemaDirectiveVisitorClass

export type Create = (
  config: ValidateDirectiveConfig,
  mutation: GraphQLField<any, any>,
) => (args: Arguments) => Arguments

export type ValidateAll = (
  args: Arguments,
  schema: ValidateDirectiveConfig,
) => any

export type ExtractValidators = (
  arg: GraphQLArgument | GraphQLField<any, any> | GraphQLInputField,
  config: ValidateDirectiveConfig,
  path?: string | string[],
) => any

export type GetDirectiveParams = (directive?: DirectiveNode) => Params

export type IsInput = (
  arg: GraphQLArgument | GraphQLInputField | GraphQLField<any, any>,
) => boolean

export type FilterValidatedMutations = (
  mutations: GraphQLFieldMap<any, any>,
) => GraphQLFieldMap<any, any>

export type IsValidatedMutation = (mutation: GraphQLField<any, any>) => boolean

export type IsValidatedArg = (
  arg: GraphQLArgument | GraphQLInputField | GraphQLField<any, any>,
) => boolean

export type FieldsOf = (
  arg:
    | GraphQLArgument
    | GraphQLInputObjectType
    | GraphQLInputField
    | GraphQLField<any, any>,
) => GraphQLFieldMap<any, any>

interface Arguments {
  [index: string]: string | Arguments
}
