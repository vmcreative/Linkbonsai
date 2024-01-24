// backend/server.js

const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}/graphql`);
});
