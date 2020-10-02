import {UserService} from '@models/user'
import {a, auth, injectArgs, injectRoot, paginate} from '@decorators'
import {applySpec, path, pipe} from 'ramda'
import * as SubService from './service'

export const SubResolver = {
  Mutation: {
    createSub: a([injectArgs(), auth()])(SubService.createSub),
    deleteSub: a([injectArgs(), auth()])(SubService.deleteSub),
    acceptSub: a([injectArgs(), auth()])(SubService.acceptSub),
  },
  Query: {
    getSubRequests: a([injectArgs(), auth(), paginate()])(
      SubService.getSubRequests,
    ),
  },
  Sub: {
    from: a([injectRoot()])(
      pipe(
        applySpec({
          root: {
            user_id: path(['root', 'from_id']),
          },
        }),
        ({root}: {root: any}) => UserService.resolveUser({root}),
      ),
    ),
    to: a([injectRoot()])(
      pipe(
        applySpec({
          root: {
            user_id: path(['root', 'to_id']),
          },
        }),
        ({root}: {root: any}) => UserService.resolveUser({root}),
      ),
    ),
  },
}
