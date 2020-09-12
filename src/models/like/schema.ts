// language=GraphQL
export const LikeSchema = `
    type Like {
        _id: ID!
        post: Post!
        user: User!
    }

    extend type Mutation {
        createLike(post_id: ID!): Like!
    }
`
