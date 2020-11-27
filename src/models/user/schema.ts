import {
  about,
  avatarUrl,
  date,
  email,
  from,
  nickname,
  password,
  token,
} from '@validation'
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
        posts(first: Int!, after: ID): PostConnection!
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
        edges: [UserEdge!]!
    }

    extend type Query {
        me: User
        user(nickname: String!): User
        users(query: String!, first: Int!, after: ID): UserConnection
        suggestions(first: Int!): UserConnection!
        doesNicknameExist(nickname: String!): Boolean!
    }

    input CreateUser {
        email: String! @validate(pattern: "${email.p}", error: "${email.e}")
        password: String! @validate(pattern: "${password.p}", error: "${password.e}")
    }

    input ResetPassword {
        token: String! @validate(pattern: "${token.p}", error: "${token.e}")
        password: String! @validate(pattern: "${password.p}", error: "${token.e}")
    }

    input UpdatePassword {
        oldPassword: String! @validate(pattern: "${password.p}", error: "${password.e}")
        newPassword: String! @validate(pattern: "${password.p}", error: "${password.e}")
    }

    input UpdateNickname {
        nickname: String! @validate(pattern: "${nickname.p}", error: "${nickname.e}")
    }

    input UpdateProfileInfo {
        avatar: String @validate(pattern: "${avatarUrl.p}", error: "${avatarUrl.e}")
        description: DescriptionInput!
    }

    input DescriptionInput {
        birthday: String @validate(pattern: "${date.p}", error: "${date.e}")
        about: String @validate(pattern: "${about.p}", error: "${about.e}")
        from: String @validate(pattern: "${from.p}", error: "${from.e}")
    }

    input ConfirmEmail {
        token: String! @validate(pattern: "${token.p}", error: "${token.e}")
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

    extend type Subscription {
        userUpdated(_id: ID!): User!
    }
`
