// language=GraphQL
export const SubSchema = `
    type Sub {
        _id: ID!
        from: User!
        to: User!
        accepted: Boolean!
    }

    type SubEdge implements Edge {
        cursor: ID!
        node: Sub!
    }

    type SubConnection implements Connection {
        pageInfo: PageInfo!
        edges: [SubEdge]!
    }

    extend type Mutation {
        createSub(nickname: String!): Sub!
        deleteSub(nickname: String!): Boolean
        acceptSub(sub_id: ID!): Sub!
    }
`
