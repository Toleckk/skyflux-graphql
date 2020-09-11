// language=GraphQL
export const SessionSchema = `
  extend type Mutation {
      createSession(login: String!, password: String!): String!
      removeCurrentSession: Boolean
  }
`
