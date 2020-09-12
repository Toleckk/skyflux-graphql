// language=GraphQL
export const CommentSchema = `
    type Comment {
        _id: ID!
        text: String!
        user: User!
        post: Post!
    }
    
    extend type Mutation {
        createComment(post_id: ID!, text: String!): Comment!
        deleteComment(_id: ID!): Boolean
    }
`
