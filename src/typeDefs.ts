import {UserSchema} from '@models/user'

// language=GraphQL
const Schema = `
    scalar Date
    
    type Query
`

export const typeDefs = [Schema, UserSchema]
