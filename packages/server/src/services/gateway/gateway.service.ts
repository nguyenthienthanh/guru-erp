import { IAccount } from '@guru-erp/interfaces'
import fs from 'fs'
import gql from 'graphql-tag'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'
import { ServerResponse } from 'http'
import { verify } from 'jsonwebtoken'
import { Context, ServiceSchema } from 'moleculer'
// tslint:disable-next-line:import-name
import { ApolloService } from 'moleculer-apollo-server'
// tslint:disable-next-line:import-name
import ApiGateway from 'moleculer-web'
import gitRepoInfo from 'utils/git-repo-info'

const gatewayService: ServiceSchema = {
  name: 'gateway',

  dependencies: ['accounts'],
  mixins: [
    ApiGateway,
    // GraphQL Apollo Server
    ApolloService({
      // Global GraphQL typeDefs
      typeDefs: gql`
        scalar Empty
        scalar Date
        scalar JSON
      `,

      // Global resolvers
      resolvers: {},

      // API Gateway route options
      routeOptions: {
        path: '/graphql',
        cors: true,
        mappingPolicy: 'restrict',
        async onBeforeCall(ctx: Context, route: string, req: any, res: ServerResponse) {
          const info = await gitRepoInfo()
          if (info) {
            res.setHeader('x-server-version', info.version)
            // COMMIT_HASH is env in heroku
            const gitSHA = info.sha
            if (gitSHA) res.setHeader('x-server-sha', gitSHA)
          }

          const accessToken =
            req.headers['x-access-token'] || req.query['accessToken'] || req.query['token']

          if (accessToken) {
            ctx.meta.accessToken = accessToken

            const account: IAccount = (await verify(accessToken, process.env.JWT_SECRET)) as any

            ctx.meta.account = account
            ctx.meta.accountId = account.id
          }
        },
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

  events: {
    // tslint:disable-next-line:function-name
    'graphql.schema.updated'({ schema }) {
      fs.writeFileSync(`${__dirname}/generated-schema.gql`, schema, 'utf8')
      this.logger.info(`Generated GraphQL schema:\n\n${schema}`)
    },
  },

  // More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
  settings: {
    port: +process.env.PORT || 3000,
    routes: [
      {
        path: '/voyager',
        use: [
          voyagerMiddleware({
            endpointUrl: '/graphql',
          }),
        ],
      },
    ],
  },
}

export = gatewayService
