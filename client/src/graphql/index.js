const { mergeTypeDefs } = require('@graphql-tools/merge');
const mutationTypeDefs = require('./mutations');
const queryTypeDefs = require('./queries');

const typeDefs = mergeTypeDefs([queryTypeDefs, mutationTypeDefs]);

module.exports = typeDefs;
