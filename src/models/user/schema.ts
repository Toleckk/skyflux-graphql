import {about, avatarUrl, date, from, nickname} from '@skyflux/api/validation'
// language=GraphQL
export const UserSchema = `
    type User @entity {
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

    extend type Mutation {
        updateNickname(user: UpdateNickname!): User! @auth
        updateProfileInfo(user: UpdateProfileInfo!): User! @auth
        makeAccountPublic: User! @auth
        makeAccountPrivate: User! @auth
    }

    extend type Subscription {
        userUpdated(_id: ID!): User!
    }
`
