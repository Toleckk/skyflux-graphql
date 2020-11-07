import {withFilter} from 'apollo-server'
import {pubsub} from '@pubsub'
import {EventDocument} from '@models/event'
import {User, UserService} from '@models/user'
import {Post, PostService} from '@models/post'
import {a, auth, injectArgs, injectRoot} from '@decorators'
import * as LikeService from './service'

export const createSubscribe = <T extends string>(
  event: T,
): ((
  root: Record<T, EventDocument>,
  args: {post_id: string},
  context: {user: User | null},
) => any) =>
  withFilter(
    (): AsyncIterator<Post> => pubsub.asyncIterator('like'),
    async (root, {post_id}, {user}): Promise<boolean> =>
      PostService.resolvePost({root: root[event], user}).then(
        post => !!post && String(post._id) === String(post_id),
      ),
  )

export const LikeResolver = {
  Mutation: {
    createLike: a([injectArgs(), auth()])(LikeService.createLike),
    deleteLike: a([injectArgs(), auth()])(LikeService.deleteLike),
  },
  Subscription: {
    likeCreated: {subscribe: createSubscribe('likeCreated')},
    likeDeleted: {subscribe: createSubscribe('likeDeleted')},
  },
  Like: {
    user: a([injectRoot()])(({root}) => UserService.resolveUser({root})),
    post: a([auth({passOnly: true}), injectRoot()])(({user, root}) =>
      PostService.resolvePost({user, root}),
    ),
  },
}
