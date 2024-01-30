// backend/server.js

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const { server } = require('./graphqlServer');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

startApolloServer().then(() => {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}/graphql`));
});
