import { ApolloServer } from 'apollo-server-lambda';
import { buildSubgraphSchema } from '@apollo/federation';
import {typeDefs, resolvers} from '@barun/jobs-service';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

exports.handler = server.createHandler();
