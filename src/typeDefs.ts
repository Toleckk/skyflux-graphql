import {UserSchema} from '@models/user'
import {SessionSchema} from '@models/session'

// language=GraphQL
const Schema = `
    scalar Date

    type Mutation
    type Query
`

export const typeDefs = [Schema, UserSchema, SessionSchema]
