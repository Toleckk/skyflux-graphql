import {UserInputError} from 'apollo-server'

export class ValidationError extends UserInputError {
  constructor(params: Record<string, string[]>) {
    super('Validation error', params)
  }
}
