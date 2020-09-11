import Mongoose from 'mongoose'
import {ApolloServer} from 'apollo-server'
import {makeExecutableSchema} from 'graphql-tools'
import {SessionService} from '@models/session'
import {typeDefs} from './typeDefs'
import {resolvers} from './resolvers'

Mongoose.connect(process.env.DB_URL as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

const schema = makeExecutableSchema({typeDefs, resolvers})

const server = new ApolloServer({
  schema,
  context: async context => {
    const {authorization = ''} = context.req.headers
    const token = (authorization as string).match(/Bearer (.+)/)?.[1]

    return {
      ...context,
      token,
      user: token ? await SessionService.getMe(token) : null,
    }
  },
  cors: {
    origin: '*',
  },
})

server.listen({port: 4000}).then(({url}) => {
  console.log(`Server ready at ${url}`)
})
