// language=GraphQL
export const CommentSchema = `
    type Comment @entity {
        _id: ID! @id
        text: String! @column
        user: User! @link
        post: Post! @link
        createdAt: Date! @column
    }

    type CommentEdge implements Edge {
        cursor: ID!
        node: Comment!
    }

    type CommentConnection implements Connection {
        edges: [CommentEdge]!
        pageInfo: PageInfo!
    }

    type DeletedComment {
        _id: ID!
        post: Post!
    }

    extend type Query {
        getCommentsByPostId(post_id: ID!, first: Int!, after: ID): CommentConnection
    }

    input CreateComment {
        post_id: ID!
        text: String! @constraint(minLength: 1, maxLength: 120)
    }

    extend type Mutation {
        createComment(comment: CreateComment!): Comment! @auth
        deleteComment(_id: ID!): DeletedComment @auth
    }

    extend type Subscription {
        commentCreated(post_id: ID!): Comment!
        commentDeleted(post_id: ID!): DeletedComment
    }
`
