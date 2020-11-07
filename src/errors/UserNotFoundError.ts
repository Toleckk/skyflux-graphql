import {UserInputError} from 'apollo-server'

export class UserNotFoundError extends UserInputError {
  constructor() {
    super('User input error', {login: 'User not found'})
  }
}
