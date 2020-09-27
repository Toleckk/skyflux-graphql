import {IResolvers} from 'graphql-tools'
import {applySpec, pipe, prop} from 'ramda'
import {a, auth, injectArgs, injectRoot, paginate} from '@decorators'
import {SubService} from '@models/sub'
import {PostService} from '@models/post'
import {User} from './types'
import * as UserService from './service'

export const UserResolver: IResolvers = {
  Mutation: {
    createUser: a([injectArgs()])(UserService.createUser),
    resetPassword: a([injectArgs()])(UserService.resetPassword),
    updatePassword: a([injectArgs(), auth()])(UserService.updatePassword),
    updateNickname: a([injectArgs(), auth()])(UserService.updateNickname),
    updateProfileInfo: a([injectArgs(), auth()])(UserService.updateProfileInfo),
    makeAccountPublic: a([auth()])(UserService.makePublic),
    makeAccountPrivate: a([auth()])(UserService.makePrivate),
  },
  Query: {
    me: a([auth({passOnly: true})])(prop('user')),
    doesNicknameExist: a([injectArgs()])(UserService.doesNicknameExist),
    getUserByNickname: a([injectArgs()])(UserService.getUserByNickname),
    getSuggestions: a([injectArgs(), auth(), paginate()])(
      UserService.getSuggestions,
    ),
    getFoundUsers: a([auth(), injectArgs(), paginate()])(
      UserService.getFoundUsers,
    ),
  },
  User: {
    isSubscribedByMe: a([auth({passOnly: true}), injectRoot()])(
      pipe(
        applySpec({
          from: prop<'user', User | undefined>('user'),
          to: prop<'root', User>('root'),
        }),
        SubService.isSubscribedBy,
      ),
    ),
    postsCount: a([injectRoot()])(
      pipe(
        applySpec({user: prop<'root', User>('root')}),
        PostService.countUserPosts,
      ),
    ),
    subsCount: a([injectRoot()])(
      pipe(applySpec({user: prop<'root', User>('root')}), SubService.countSubs),
    ),
  },
}
