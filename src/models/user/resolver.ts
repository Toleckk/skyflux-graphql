import {IResolvers} from 'graphql-tools'
import {prop} from 'ramda'
import {
  a,
  auth,
  date,
  injectArgs,
  injectRoot,
  paginate,
  validate,
} from '@decorators'
import {SubService} from '@models/sub'
import {PostService} from '@models/post'
import {password} from '@validation'
import * as UserService from './service'

export const UserResolver: IResolvers = {
  Mutation: {
    createUser: a([injectArgs(), validate()])(UserService.createUser),
    resetPassword: a([injectArgs(), validate()])(UserService.resetPassword),
    updatePassword: a([
      injectArgs(),
      auth(),
      validate({
        schemas: {
          newPassword: password,
          oldPassword: password,
        },
      }),
    ])(UserService.updatePassword),
    updateNickname: a([injectArgs(), auth(), validate()])(
      UserService.updateNickname,
    ),
    updateProfileInfo: a([
      validate(),
      auth(),
      injectArgs(),
      date({paths: [['description', 'birthday']]}),
    ])(UserService.updateProfileInfo),
    makeAccountPublic: a([auth()])(UserService.makePublic),
    makeAccountPrivate: a([auth()])(UserService.makePrivate),
    confirmEmail: a([injectArgs(), validate()])(UserService.confirmEmail),
  },
  Query: {
    me: a([auth({passOnly: true})])(prop('user')),
    doesNicknameExist: a([injectArgs()])(UserService.doesNicknameExist),
    getUserByNickname: a([injectArgs()])(UserService.getUserByNickname),
    getSuggestions: a([injectArgs(), auth(), paginate()])(
      UserService.getSuggestions,
    ),
    getFoundUsers: a([auth({passOnly: true}), injectArgs(), paginate()])(
      UserService.getFoundUsers,
    ),
  },
  User: {
    mySub: a([auth({passOnly: true}), injectRoot()])(({user, root}) =>
      SubService.getSubFromTo({from: user, to: root}),
    ),
    postsCount: a([injectRoot({as: 'user'})])(PostService.countUserPosts),
    subsCount: a([injectRoot({as: 'user'})])(SubService.countSubs),
    subscribersCount: a([injectRoot({as: 'user'})])(
      SubService.countSubscribers,
    ),
  },
}
