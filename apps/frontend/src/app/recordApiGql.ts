import { ApolloClient, InMemoryCache } from '@apollo/client';

export const recordsClient = new ApolloClient({
  uri: 'http://localhost:3333/graphql',
  cache: new InMemoryCache(),
});
