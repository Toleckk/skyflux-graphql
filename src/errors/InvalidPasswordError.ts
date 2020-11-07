import {UserInputError} from 'apollo-server'

export class InvalidPasswordError extends UserInputError {
  constructor() {
    super('User input error', {password: 'Invalid password'})
  }
}
