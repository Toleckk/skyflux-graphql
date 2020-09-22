import {IResolvers} from 'graphql-tools'
import {prop} from 'ramda'
import {a, auth, injectArgs} from '@decorators'
import * as UserService from './service'

export const UserResolver: IResolvers = {
  Mutation: {
    createUser: a([injectArgs()])(UserService.createUser),
    resetPassword: a([injectArgs()])(UserService.resetPassword),
    updatePassword: a([injectArgs(), auth()])(UserService.updatePassword),
    updateNickname: a([injectArgs(), auth()])(UserService.updateNickname),
    updateProfileInfo: a([injectArgs(), auth()])(UserService.updateProfileInfo),
  },
  Query: {
    me: a([auth({passOnly: true})])(prop('user')),
    doesNicknameExist: a([injectArgs()])(UserService.doesNicknameExist),
  },
}
