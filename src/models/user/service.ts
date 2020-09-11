import {generateNickname} from '@utils/generateNickname'
import {User, UserModel} from '@models/user'

export const createUser = async ({
  email,
  password,
}: {
  email: string
  password: string
}): Promise<User> => {
  const nickname = generateNickname()
  return await UserModel.create({nickname, email, password})
}
