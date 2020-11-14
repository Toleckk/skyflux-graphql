// language=GraphQL
export const LikeSchema = `
    type Like @entity {
        _id: ID! @id
        post: Post! @link
        user: User! @link
    }

    extend type Mutation {
        createLike(post_id: ID!): Like! @auth
        deleteLike(post_id: ID!): Boolean @auth
    }
    
    extend type Subscription {
        likeCreated(post_id: ID!): Like!
        likeDeleted(post_id: ID!): Like!
    }
`
