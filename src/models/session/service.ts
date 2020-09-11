import {User} from '../user'
import {SessionModel} from './model'

export const getMe = async (token: string): Promise<User | null> => {
  const session = await SessionModel.findOne({token}).populate('user_id')
  return session?.user_id as User | null
}
