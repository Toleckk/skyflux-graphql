// language=GraphQL
export const EventSchema = `
    type SubEvent {
        createdAt: Date!
        kind: String!
        subj: SubEventBody!
    }

    type SubEventBody {
        sub: Sub!
    }

    type CommentEvent {
        createdAt: Date!
        kind: String!
        subj: CommentEventBody!
    }

    type CommentEventBody {
        comment: Comment!
    }
    
    type LikeEvent {
        createdAt: Date!
        kind: String!
        subj: LikeEventBody!
    }
    
    type LikeEventBody {
        like: Like!
    }

    union Event = SubEvent | CommentEvent | LikeEvent

    type EventEdge implements Edge {
        cursor: ID!
        node: Event!
    }

    type EventConnection implements Connection {
        edges: [EventEdge]!
        pageInfo: PageInfo!
    }
    
    extend type Query {
        getEvents(first: Int, after: ID): EventConnection!
    }
    
    extend type Subscription {
        eventAdded: Event!
        eventDeleted: Entity
    }
`
