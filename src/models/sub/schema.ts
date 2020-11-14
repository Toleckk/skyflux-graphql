// language=GraphQL
export const SubSchema = `
    type Sub @entity {
        _id: ID! @id
        from: User! @link
        to: User! @link
        accepted: Boolean! @column
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

    extend type Query {
        getSubRequests(first: Int!, after: ID): SubConnection! @auth
        getSubRequestsCount: Int! @auth
    }

    extend type Mutation {
        createSub(nickname: String!): Sub! @auth
        deleteSub(nickname: String!): DeletedSub @auth
        acceptSub(_id: ID!): Sub! @auth
        declineSub(_id: ID!): DeletedSub @auth
    }

    extend type Subscription {
        subAccepted: Sub! @auth
        subRequestCreated: Sub! @auth
        subDeleted: DeletedSub @auth
    }
`
