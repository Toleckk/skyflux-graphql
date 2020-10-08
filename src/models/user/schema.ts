// language=GraphQL
export const UserSchema = `
    type Description {
        birthday: Date
        about: String
        from: String
    }

    type User {
        _id: ID!
        nickname: String!
        avatar: String
        description: Description!
        private: Boolean!
        isSubscribedByMe: Boolean!
        postsCount: Int!
        subsCount: Int!
        subscribersCount: Int!
    }

    type UserEdge implements Edge {
        cursor: ID!
        node: User!
    }

    type UserConnection implements Connection{
        pageInfo: PageInfo!
        edges: [UserEdge]!
    }

    input DescrpitionInput {
        birthday: String
        about: String
        from: String
    }
    
    extend type Query {
        me: User
        getUserByNickname(nickname: String!): User
        doesNicknameExist(nickname: String!): Boolean!
        getSuggestions(first: Int): UserConnection!
        getFoundUsers(text: String!, first: Int, after: ID): UserConnection
    }

    extend type Mutation {
        createUser(email: String!, password: String!): User!
        resetPassword(token: String!, password: String!): Boolean
        updatePassword(oldPassword: String!, newPassword: String!): Boolean
        updateNickname(nickname: String!): User!
        updateProfileInfo(avatar: String, description: DescrpitionInput!): User!
        makeAccountPublic: User!
        makeAccountPrivate: User!
        confirmEmail(token: String!): Boolean!
    }
`
