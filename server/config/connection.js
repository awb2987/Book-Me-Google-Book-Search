const mongoose = require('mongoose');
require('dotenv').config();

// Use a connection string from the environment or default to local MongoDB
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookSearchDB';

// Connect to MongoDB with options
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Export the connection
module.exports = mongoose.connection;
