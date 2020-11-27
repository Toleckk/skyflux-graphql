import {login, password} from '@skyflux/api/validation'

// language=GraphQL
export const SessionSchema = `
    input CreateSession {
        login: String! @validate(pattern: "${login.p}", error: "${login.e}")
        password: String! @validate(pattern: "${password.p}", error: "${password.e}")
    }

    extend type Mutation {
        createSession(credentials: CreateSession!): String!
        deleteCurrentSession: Boolean @auth
    }
`
