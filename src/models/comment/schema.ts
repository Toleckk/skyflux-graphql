// language=GraphQL
export const CommentSchema = `
    type Comment {
        _id: ID!
        text: String!
        user: User!
        post: Post!
        createdAt: Date!
    }

    type CommentEdge implements Edge {
        cursor: ID!
        node: Comment!
    }

    type CommentConnection implements Connection {
        edges: [CommentEdge]!
        pageInfo: PageInfo!
    }

    extend type Mutation {
        createComment(post_id: ID!, text: String!): Comment!
        deleteComment(_id: ID!): ID
    }

    extend type Subscription {
        commentCreated(post_id: ID!): Comment!
    }

    extend type Query {
        getCommentsByPostId(post_id: ID!, first: Int, after: ID): CommentConnection
    }
`
