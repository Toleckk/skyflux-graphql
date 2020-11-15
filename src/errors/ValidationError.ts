import {UserInputError} from 'apollo-server'

export class ValidationError extends UserInputError {
  constructor(params: Arguments) {
    super('Validation error', params)
  }
}

interface Arguments {
  [index: string]: string | Arguments
}
