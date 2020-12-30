import Firebase from 'firebase-admin'
import jwt from 'jsonwebtoken'
import {UserService} from '@skyflux/api/models/user'
import {UserDbObject} from '@skyflux/api/models/types'

export const admin = Firebase.initializeApp(
  !process.env.FIREBASE_AUTH_EMULATOR_HOST
    ? {
        credential: Firebase.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      }
    : {
        projectId: process.env.FIREBASE_PROJECT_ID,
      },
)

export const userByToken = async (
  token?: string,
): Promise<null | UserDbObject> => {
  if (!token) return null

  const user = await decodeToken(token)

  if (!user) return null

  return getUserByUID(user.uid || user.user_id)
}

export const decodeToken = async (
  token: string,
): Promise<{uid?: string; user_id?: string} | null> => {
  if (process.env.FIREBASE_AUTH_EMULATOR_HOST)
    return jwt.decode(token) as {uid: string; user_id: string}

  return admin
    .auth()
    .verifyIdToken(token, true)
    .catch(() => null)
}

export const getUserByUID = async (
  uid?: string,
): Promise<null | UserDbObject> => {
  if (!uid) return null

  const mapping = await getUserMapping(uid)

  if (!mapping || !mapping._id) {
    const user = await UserService.createUser()
    await mapUsers(String(user._id), uid)
    return user
  }

  return UserService.getUserById(mapping._id)
}

const cache: any = {}

export const getUserMapping = async (
  uid: string,
): Promise<{_id: string; uid: string}> => {
  if (cache[uid]) return cache[uid]

  return admin
    .firestore()
    .collection('users')
    .where('uid', '==', uid)
    .where('_id', '!=', null)
    .get()
    .then(e => e.docs?.[0]?.data?.())
    .then(e => {
      cache[uid] = e
      return e
    }) as Promise<{_id: string; uid: string}>
}

export const mapUsers = (_id: string, uid: string): Promise<unknown> =>
  admin
    .firestore()
    .collection('users')
    .add({_id, uid})
    .then(e => {
      cache[uid] = {uid, _id}
      return e
    })
