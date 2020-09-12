// language=GraphQL
export const SubSchema = `
    type Sub {
        _id: ID!
        from: User!
        to: User!
    }

    extend type Mutation {
        createSub(nickname: String!): Sub!
        removeSub(nickname: String!): Boolean
    }
`
