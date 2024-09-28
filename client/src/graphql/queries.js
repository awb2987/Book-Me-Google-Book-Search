const { gql } = require('apollo-server-express');

const typeDefs = gql`
  extend type Query {
    me: User
    getSingleUser(username: String!): User
  }
`;

module.exports = typeDefs;
