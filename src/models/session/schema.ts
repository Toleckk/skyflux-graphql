import {login, password} from '@validation'

// language=GraphQL
export const SessionSchema = `
    input CreateSession {
        login: String! @constraint(pattern: "${login}")
        password: String! @constraint(pattern: "${password}")
    }

    extend type Mutation {
        createSession(credentials: CreateSession!): String!
        deleteCurrentSession: Boolean @auth
    }
`
