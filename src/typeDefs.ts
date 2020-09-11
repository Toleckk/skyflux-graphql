import {UserSchema} from '@models/user'
import {SessionSchema} from '@models/session'
import {ResetSchema} from '@models/reset'

// language=GraphQL
const Schema = `
    scalar Date

    type Mutation
    type Query
`

export const typeDefs = [Schema, UserSchema, SessionSchema, ResetSchema]
