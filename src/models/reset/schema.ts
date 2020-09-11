// language=GraphQL
export const ResetSchema = `
    extend type Mutation {
        createResetRequest(login: String!): Boolean
    }
`
