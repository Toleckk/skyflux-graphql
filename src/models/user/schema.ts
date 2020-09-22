// language=GraphQL
export const UserSchema = `
    type Description {
        birthday: String
        about: String
        from: String
    }

    type User {
        nickname: String!
        avatar: String
        description: Description!
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

    input ProfileInfoInput {
        avatar: String
        description: DescrpitionInput!
    }

    extend type Query {
        me: User
        getUserByNickname(nickname: String!): User
        doesNicknameExist(nickname: String!): Boolean!
        getSuggestions(first: Int!): UserConnection!
        getFoundUsers(text: String!, first: Int, after: String): UserConnection
    }

    extend type Mutation {
        createUser(email: String!, password: String!): User!
        resetPassword(token: String!, password: String!): Boolean
        updatePassword(oldPassword: String!, newPassword: String!): Boolean
        updateNickname(nickname: String!): User!
        updateProfileInfo(profileInfo: ProfileInfoInput): User!
    }
`
