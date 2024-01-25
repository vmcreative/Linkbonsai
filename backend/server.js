// backend/server.js

const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const cors = require('cors');
const app = express();

app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });

app.get('/api/users/handle/:userHandle', async (req, res) => {
  try {
    const userHandle = req.params.userHandle;

    // Define the GraphQL query to fetch user data
    const gqlQuery = `
      query GetUserByHandle($userHandle: String!) {
        userByHandle(user_handle: $userHandle) {
          user_id
          user_email
          user_handle
          user_first_name
          user_last_name
          user_header
          user_subheader
          user_image
          user_theme
          items {
            item_id
            item_url
            item_thumbnail
            item_text
            item_style
          }
        }
      }
    `;

    // Execute the GraphQL query
    const { data } = await server.executeOperation({
      query: gqlQuery,
      variables: { userHandle },
    });

    const userData = data.userByHandle;

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user data as JSON response
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer().then(() => {
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/graphql`);
  });
});
