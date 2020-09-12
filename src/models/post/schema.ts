// language=GraphQL
export const PostSchema = `
    type Post {
        _id: ID!
        text: String!
        createdAt: Date!
        user: User!
    }

    extend type Mutation {
        createPost(text: String!): Post!
    }
`
