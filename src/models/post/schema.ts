// language=GraphQL
export const PostSchema = `
    type Post {
        _id: ID!
        text: String!
        createdAt: Date!
        user: User!
        isLikedByMe: Boolean!
        likesCount: Int!
        commentsCount: Int!
    }
    
    type PostEdge implements Edge {
        cursor: ID!
        node: Post!
    }
    
    type PostConnection implements Connection {
        pageInfo: PageInfo!
        edges: [PostEdge]!
    }

    extend type Query {
        getPostById(_id: ID!): Post
        getPostsByNickname(nickname: String!, first: Int, after: ID): PostConnection!
        getFoundPosts(text: String!, first: Int, after: ID): PostConnection!
        getFeed(first: Int, after: ID): PostConnection!
    }
    
    extend type Subscription {
        postCreated(nickname: String): Post!
    }

    extend type Mutation {
        createPost(text: String!): Post!
        deletePost(_id: ID!): Boolean
    }
`
