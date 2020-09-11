// language=GraphQL
export const UserSchema = `
    type User {
        nickname: String!
    }
    
    extend type Query {
        me: User
    }

    extend type Mutation {
        createUser(email: String!, password: String!): User!
        resetPassword(token: String!, password: String!): Boolean
    }
`
