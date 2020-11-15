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
        edges: [PostEdge]!
    }

    type DeletedPost {
        _id: ID!
        deleted: Boolean!
        user: User!
    }

    union MaybePost = Post | DeletedPost

    extend type Query {
        getPostById(_id: ID!): Post
        getPostsByNickname(nickname: String!, first: Int!, after: ID): PostConnection!
        getFoundPosts(text: String!, first: Int!, after: ID): PostConnection!
        getFeed(first: Int!, after: ID): PostConnection! @auth
    }

    input CreatePost {
        text: String! @validate(pattern: "${text.p}", error: "${text.e}")
    }

    extend type Mutation {
        createPost(post: CreatePost!): Post! @auth
        deletePost(_id: ID!): DeletedPost @auth
    }

    extend type Subscription {
        postCreated(nickname: String): Post!
        postDeleted(nickname: String): DeletedPost

        postUpdated(nickname: String!): MaybePost!
    }
`
