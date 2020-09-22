// language=GraphQL
export const CommentSchema = `
    type Comment {
        _id: ID!
        text: String!
        user: User!
        post: Post!
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
        deleteComment(_id: ID!): Boolean
    }
`
