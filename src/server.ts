import Mongoose from 'mongoose'
import {ApolloServer} from 'apollo-server'
import {makeExecutableSchema} from 'graphql-tools'

Mongoose.connect(process.env.DB_URL as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

const schema = makeExecutableSchema({
  typeDefs: `type Query {a: Boolean}`,
  resolvers: {
    a: () => true,
  },
})

const server = new ApolloServer({
  schema,
  cors: {
    origin: '*',
  },
})

server.listen({port: 4000}).then(({url}) => {
  console.log(`Server ready at ${url}`)
})
