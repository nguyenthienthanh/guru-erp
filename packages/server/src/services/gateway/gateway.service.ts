import gql from 'gql-tag'
import { ServiceSchema } from 'moleculer'
// tslint:disable-next-line:import-name
import { ApolloService } from 'moleculer-apollo-server'
// tslint:disable-next-line:import-name
import ApiGateway from 'moleculer-web'

const apiService: ServiceSchema = {
  name: 'api',

  mixins: [
    ApiGateway, // GraphQL Apollo Server
    ApolloService({
      // Global GraphQL typeDefs
      typeDefs: gql`
        scalar Empty
        scalar Date
        scalar JSON
        type Query {
          _empty: Empty
        }
      `,

      // Global resolvers
      resolvers: {},

      // API Gateway route options
      routeOptions: {
        path: '/graphql',
        cors: true,
        mappingPolicy: 'restrict',
      },

      // https://www.apollographql.com/docs/apollo-server/v2/api/apollo-server.html
      serverOptions: {
        tracing: true,

        engine: {
          apiKey: process.env.APOLLO_ENGINE_KEY,
        },
      },
    }),
  ],

  // More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
  settings: {
    port: +process.env.PORT || 3000,
  },
}

export = apiService
