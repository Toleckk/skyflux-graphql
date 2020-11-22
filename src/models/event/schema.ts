// language=GraphQL
export const EventSchema = `
    enum EventType {
        Sub, Comment, Like
    }

    type Event @entity(additionalFields: [
        {path: "_id", type: "ObjectID"},
        {path: "channel", type: "string"},
        {path: "emitter", type: "ObjectID | UserDbObject"},
    ]) {
        _id: ID! @id
        createdAt: Date! @column
        kind: EventType! @column
        subj: EventBody! @embedded
    }

    union EventBody @union = SubEventBody | CommentEventBody | LikeEventBody

    type SubEventBody @entity(embedded: true) {
        sub: Sub! @link
    }

    type CommentEventBody @entity(embedded: true) {
        comment: Comment! @link
    }

    type LikeEventBody @entity(embedded: true) {
        like: Like! @link
    }

    type DeletedEvent {
        _id: ID!
        deleted: Boolean!
    }

    union MaybeEvent = Event | DeletedEvent

    type EventEdge implements Edge {
        cursor: ID!
        node: Event!
    }

    type EventConnection implements Connection {
        edges: [EventEdge!]!
        pageInfo: PageInfo!
    }

    extend type Query {
        events(first: Int!, after: ID): EventConnection! @auth
    }

    extend type Subscription {
        eventUpdated: MaybeEvent! @auth
    }
`
