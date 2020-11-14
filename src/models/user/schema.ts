import {avatarUrl, email, nickname, password} from '@validation'
// language=GraphQL
export const UserSchema = `
    type User @entity(additionalFields: [
        {path: "email", type: "string"},
        {path: "password", type: "string"},
    ]) {
        _id: ID! @id
        nickname: String! @column
        avatar: String @column
        description: Description! @embedded
        private: Boolean! @column
        mySub: Sub
        postsCount: Int!
        subsCount: Int!
        subscribersCount: Int!
    }

    type Description @entity(embedded: true){
        birthday: Date @column
        about: String @column
        from: String @column
    }

    type UserEdge implements Edge {
        cursor: ID!
        node: User!
    }

    type UserConnection implements Connection{
        pageInfo: PageInfo!
        edges: [UserEdge]!
    }

    extend type Query {
        me: User @auth
        getUserByNickname(nickname: String!): User
        doesNicknameExist(nickname: String!): Boolean!
        getSuggestions(first: Int!): UserConnection!
        getFoundUsers(text: String!, first: Int!, after: ID): UserConnection
    }

    input CreateUser {
        email: String! @constraint(pattern: "${email}")
        password: String! @constraint(pattern: "${password}")
    }

    input ResetPassword {
        token: String! @constraint(minLength: 36, maxLength: 36)
        password: String! @constraint(pattern: "${password}")
    }

    input UpdatePassword {
        oldPassword: String! @constraint(pattern: "${password}")
        newPassword: String! @constraint(pattern: "${password}")
    }

    input UpdateNickname {
        nickname: String! @constraint(pattern: "${nickname}")
    }

    input UpdateProfileInfo {
        avatar: String @constraint(pattern: "${avatarUrl}")
        description: DescrpitionInput!
    }

    input DescrpitionInput {
        birthday: String @constraint(format: "date")
        about: String @constraint(maxLength: 120)
        from: String @constraint(maxLength: 36)
    }

    input ConfirmEmail {
        token: String! @constraint(minLength: 36, maxLength: 36)
    }

    extend type Mutation {
        createUser(user: CreateUser!): User!
        resetPassword(credentials: ResetPassword!): Boolean
        updatePassword(credentials: UpdatePassword!): Boolean @auth
        updateNickname(user: UpdateNickname!): User! @auth
        updateProfileInfo(user: UpdateProfileInfo!): User! @auth
        makeAccountPublic: User! @auth
        makeAccountPrivate: User! @auth
        confirmEmail(credentials: ConfirmEmail!): Boolean!
    }
`
