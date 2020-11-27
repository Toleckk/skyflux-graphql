import {withFilter} from 'apollo-server'
import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
  SubscriptionResolvers,
  UserResolvers,
} from '@skyflux/api/models/types'
import {SubService} from '@skyflux/api/models/sub'
import {PostService} from '@skyflux/api/models/post'
import {paginate} from '@skyflux/api/utils/paginate'
import {pubsub} from '@skyflux/api/pubsub'
import * as UserService from './service'
import {filterUserUpdated} from './subscriptions'

export const UserResolver: Resolvers = {
  User: <UserResolvers>{
    mySub: (to, _, {user}) => (user ? SubService.getSubFromTo(user, to) : null),
    postsCount: root => PostService.countUserPosts(root),
    subsCount: root => SubService.countSubs(root),
    subscribersCount: root => SubService.countSubscribers(root),
    posts: (root, {first, after}, {user}) =>
      paginate((first, after) =>
        PostService.getPostsByNickname(root.nickname, user, first, after),
      )(first, after),
  },
  Query: <QueryResolvers>{
    me: (_, __, {user}) => user,
    doesNicknameExist: (_, {nickname}) =>
      UserService.doesNicknameExist(nickname),
    user: (_, {nickname}) => UserService.getUserByNickname(nickname),
    suggestions: (_, {first}, {user}) =>
      paginate(first => UserService.getSuggestions(user, first))(first),
    users: (_, {query, first, after}, {user}) =>
      paginate((first, after) =>
        UserService.getFoundUsers(query, user, first, after),
      )(first, after),
  },
  Mutation: <MutationResolvers>{
    createUser: (root, {user}) =>
      UserService.createUser(user.email, user.password),
    resetPassword: (root, {credentials}) =>
      UserService.resetPassword(credentials.token, credentials.password),
    updatePassword: (root, {credentials: {oldPassword, newPassword}}, {user}) =>
      UserService.updatePassword(user, oldPassword, newPassword),
    updateNickname: (root, {user: {nickname}}, {user}) =>
      UserService.updateNickname(user, nickname),
    updateProfileInfo: (root, {user: info}, {user}) =>
      UserService.updateProfileInfo(user, info),
    makeAccountPublic: (_, __, {user}) => UserService.makePublic(user),
    makeAccountPrivate: (_, __, {user}) => UserService.makePrivate(user),
    confirmEmail: (_, {credentials: {token}}) =>
      UserService.confirmEmail(token),
  },
  Subscription: <SubscriptionResolvers>{
    userUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('user'),
        filterUserUpdated,
      ),
    },
  },
}
