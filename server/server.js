const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors'); // Import CORS
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // Enable CORS for all requests

// APPLY authentication middleware
app.use(authMiddleware);

// SERVE static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// CREATE the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Ensure req is defined
    if (!req) {
      return {};
    }

    // GET token from headers
    const token = req.headers.authorization || '';
    let user = null;

    // VERIFY token & extract user info
    if (token) {
      try {
        const { data } = jwt.verify(token.split(' ').pop(), process.env.JWT_SECRET);
        user = data;
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }

    return { user };
  },
});

// APPLY the Apollo middleware to the Express server
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

// CONNECT to MongoDB and start the server
db.once('open', () => {
  startApolloServer().then(() => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`);
    });
  });
});
