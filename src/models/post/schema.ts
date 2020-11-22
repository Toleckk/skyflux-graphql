import {text} from '@validation'

// language=GraphQL
export const PostSchema = `
    type Post @entity {
        _id: ID! @id
        text: String! @column
        createdAt: Date! @column
        user: User! @link
        isLikedByMe: Boolean!
        likesCount: Int!
        commentsCount: Int!
        comments(first: Int!, after: ID): CommentConnection!
    }

    type PostEdge implements Edge {
        cursor: ID!
        node: Post!
    }

    type PostConnection implements Connection {
        pageInfo: PageInfo!
        edges: [PostEdge!]!
    }

    type DeletedPost {
        _id: ID!
        deleted: Boolean!
        user: User!
    }

    union MaybePost = Post | DeletedPost

    extend type Query {
        post(_id: ID!): Post
        userPosts(nickname: String!, first: Int!, after: ID): PostConnection!
        posts(query: String!, first: Int!, after: ID): PostConnection!
        feed(first: Int!, after: ID): PostConnection! @auth
    }

    input CreatePost {
        text: String! @validate(pattern: "${text.p}", error: "${text.e}")
    }

    extend type Mutation {
        createPost(post: CreatePost!): Post! @auth
        deletePost(_id: ID!): DeletedPost @auth
    }

    extend type Subscription {
        postUpdated(nickname: String!): MaybePost!
    }
`
