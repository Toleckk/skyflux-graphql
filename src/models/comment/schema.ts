// language=GraphQL
import {text} from '@skyflux/api/validation'

export const CommentSchema = `
    type Comment @entity {
        _id: ID! @id
        text: String! @column
        user: User! @link
        post: Post! @link
        createdAt: Date! @column
    }

    type CommentEdge implements Edge {
        cursor: ID!
        node: Comment!
    }

    type CommentConnection implements Connection {
        edges: [CommentEdge!]!
        pageInfo: PageInfo!
    }

    type DeletedComment {
        _id: ID!
        post: Post!
        deleted: Boolean!
    }

    extend type Query {
        comments(post_id: ID!, first: Int!, after: ID): CommentConnection!
    }

    input CreateComment {
        post_id: ID!
        text: String! @validate(pattern: "${text.p}", error: "${text.e}")
    }

    extend type Mutation {
        createComment(comment: CreateComment!): Comment! @auth
        deleteComment(_id: ID!): DeletedComment @auth
    }
    
    union MaybeComment = Comment | DeletedComment

    extend type Subscription {
        commentUpdated(post_id: ID!): MaybeComment!
    }
`
