import {UserModel} from '@models/user'
import {ResetModel} from '@models/reset/model'
import {v4} from 'uuid'

export const createResetRequest = async ({
  login,
}: {
  login: string
}): Promise<boolean> => {
  const user = await UserModel.findOne({
    $or: [{nickname: login}, {email: login}],
  })

  if (!user) return false

  await ResetModel.create({user_id: user._id, token: v4()})

  return true
}
