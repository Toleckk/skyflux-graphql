// language=GraphQL
export const LikeSchema = `
    type Like {
        _id: ID!
        post: Post!
        user: User!
    }

    extend type Mutation {
        createLike(post_id: ID!): Like!
        deleteLike(post_id: ID!): Boolean
    }
    
    extend type Subscription {
        likeCreated(post_id: ID!): Like!
        likeDeleted(post_id: ID!): Like!
    }
`
