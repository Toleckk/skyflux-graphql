import {ApolloServer} from 'apollo-server'
import {makeExecutableSchema} from 'graphql-tools'

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
