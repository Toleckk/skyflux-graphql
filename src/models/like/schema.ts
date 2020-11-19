// language=GraphQL
export const LikeSchema = `
    type Like @entity {
        _id: ID! @id
        post: Post! @link
        user: User! @link
    }
    
    type DeletedLike {
        _id: ID!
        post: Post!
        user: User!
        deleted: Boolean!
    }
    
    union MaybeLike = Like | DeletedLike 

    extend type Mutation {
        createLike(post_id: ID!): Like! @auth
        deleteLike(post_id: ID!): DeletedLike! @auth
    }
    
    extend type Subscription {
        likeUpdated(post_id: ID!): MaybeLike!
    }
`
