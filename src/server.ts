import Mongoose from 'mongoose'
import {ApolloServer} from 'apollo-server'
import {makeExecutableSchema} from 'graphql-tools'
import {map} from 'ramda'
import {AuthDirective, ValidateDirective} from '@skyflux/api/directives'
import {userByToken} from '@skyflux/api/auth'
import {typeDefs} from './typeDefs'
import {resolvers} from './resolvers'

Mongoose.connect(process.env.DB_URL as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).catch(console.error)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    auth: AuthDirective,
    validate: ValidateDirective,
  },
})

const server = new ApolloServer({
  schema,
  formatError: e => {
    if (e.message.match(/E11000/))
      return {
        ...e,
        extensions: {
          ...e.extensions,
          exception: map(
            () => 'Duplicate value',
            e.extensions?.exception?.keyValue || {},
          ),
        },
      }

    return e
  },
  context: async context => {
    const authorization =
      context.req?.headers?.authorization ||
      context.connection?.context?.Authorization ||
      context.connection?.context?.authorization ||
      String()

    const token = (authorization as string).match(/Bearer (.+)/)?.[1]

    return {
      ...context,
      token,
      user: await userByToken(token),
    }
  },
  cors: {
    origin: '*',
  },
  subscriptions: {
    path: '/',
  },
  introspection: true,
  playground: {
    subscriptionEndpoint: '/',
  },
})

server.listen({port: process.env.PORT || 4000}).then(({url}) => {
  console.log(`Server ready at ${url}`)
})
