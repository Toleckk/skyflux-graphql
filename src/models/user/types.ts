import {Document} from 'mongoose'

export interface User extends Pick<Document, '_id'>{
  nickname: string
}

export interface UserDocument extends Document, User {

}
