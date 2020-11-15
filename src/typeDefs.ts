import {UserSchema} from '@models/user'
import {SessionSchema} from '@models/session'
import {ResetSchema} from '@models/reset'
import {PostSchema} from '@models/post'
import {LikeSchema} from '@models/like'
import {CommentSchema} from '@models/comment'
import {SubSchema} from '@models/sub'
import {EventSchema} from '@models/event'
// language=GraphQL
const Schema = `
    scalar Date
    scalar ValidatedString

    type Mutation
    type Query
    type Subscription

    directive @validate(
        pattern: String
        error: String
    ) on INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION

    directive @auth on FIELD_DEFINITION

    directive @union(discriminatorField: String, additionalFields: [AdditionalEntityFields]) on UNION
    directive @abstractEntity(discriminatorField: String!, additionalFields: [AdditionalEntityFields]) on INTERFACE
    directive @entity(embedded: Boolean, additionalFields: [AdditionalEntityFields]) on OBJECT
    directive @column(overrideType: String) on FIELD_DEFINITION
    directive @id on FIELD_DEFINITION
    directive @link(overrideType: String) on FIELD_DEFINITION
    directive @embedded on FIELD_DEFINITION
    directive @map(path: String!) on FIELD_DEFINITION
    # Inputs
    input AdditionalEntityFields {
        path: String
        type: String
    }

    type Entity {
        _id: ID!
    }

    interface Edge {
        cursor: ID!
    }

    type PageInfo {
        startCursor: ID
        endCursor: ID
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
    }

    interface Connection {
        edges: [Edge]!
        pageInfo: PageInfo!
    }
`

export const typeDefs = [
  Schema,
  UserSchema,
  SessionSchema,
  ResetSchema,
  PostSchema,
  LikeSchema,
  CommentSchema,
  SubSchema,
  EventSchema,
]
