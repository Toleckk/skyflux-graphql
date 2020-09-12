// language=GraphQL
export const PostSchema = `
    type Post {
        _id: ID!
        text: String!
        createdAt: Date!
        user: User!
    }

    extend type Query {
        getPostById(_id: ID!): Post
    }

    extend type Mutation {
        createPost(text: String!): Post!
        deletePost(_id: ID!): Boolean
    }
`
