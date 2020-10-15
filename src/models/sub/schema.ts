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

    extend type Subscription {
        subAccepted: Sub!
        subRequestCreated: Sub!
        subDeleted: Entity
    }

    extend type Query {
        getSubRequests(first: Int, after: ID): SubConnection!
        getSubRequestsCount: Int!
    }
`
