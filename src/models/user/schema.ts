// language=GraphQL
export const UserSchema = `
    type User {
        nickname: String!
    }
    
    extend type Query {
        me: User
    }
`
