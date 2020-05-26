const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const {makeExecutableSchema} =require('graphql-tools');

// Construct a schema, using GraphQL schema language
const typeDefs  = `
	type Blog{
		id: Int
		title: String
	}
	type Query{
		blogs : String
	}
`
const resolvers = {
  Query: {
    blogs: ()=>"SSS"
  }
}
const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

/*const schema = buildSchema(`
  type Query {
    hello: String
  }
`);*/

// Provide resolver functions for your schema fields

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers
}));
app.listen(4000);

console.log(`🚀 Server ready at http://localhost:4000/graphql`);