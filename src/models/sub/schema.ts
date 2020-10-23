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

    type DeletedSub {
        _id: ID!
        from: User!
        to: User!
    }

    extend type Mutation {
        createSub(nickname: String!): Sub!
        deleteSub(nickname: String!): DeletedSub
        acceptSub(sub_id: ID!): Sub!
        declineSub(_id: ID!): DeletedSub
    }

    extend type Subscription {
        subAccepted: Sub!
        subRequestCreated: Sub!
        subDeleted: DeletedSub
    }

    extend type Query {
        getSubRequests(first: Int, after: ID): SubConnection!
        getSubRequestsCount: Int!
    }
`
