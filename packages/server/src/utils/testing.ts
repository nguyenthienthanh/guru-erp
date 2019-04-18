import { default as getPort } from 'get-port'
import { GraphQLClient } from 'graphql-request'
import { ServiceBroker } from 'moleculer'
import MongoMemoryServer from 'mongodb-memory-server'

import {
  CREATE_ACCOUNT_MUTATION,
  SIGN_IN_MUTATION,
} from 'services/accounts/__test__/accounts.queries'
import { genAccountParams } from './mocks/accounts.mocks'
// tslint:disable-next-line:import-name
import YupValidator from './moleculer-yup-validator'

export const createTestBroker = (logLevel = process.env.LOGLEVEL) =>
  new ServiceBroker({
    logLevel: logLevel as any,
    validator: new YupValidator(),
  })

export const loadAllServices = (broker: ServiceBroker) => {
  const gatewayService = require('services/gateway/gateway.service')
  const accountsService = require('services/accounts/accounts.service')
  const orgsService = require('services/orgs/orgs.service')
  const mailerService = require('services/mailer/mailer.service')
  const membersService = require('services/members/members.service')

  broker.createService(gatewayService)
  broker.createService(accountsService)
  broker.createService(orgsService)
  broker.createService(mailerService)
  broker.createService(membersService)

  return broker
}

export const randEnvPort = async () => {
  const PORT = (await getPort()).toString()
  process.env.PORT = PORT
  return PORT
}

export const mockMongoServer = async () => {
  const mongoServer = new MongoMemoryServer()
  process.env.MONGO_URI = await mongoServer.getConnectionString()
  return mongoServer
}

export interface TestGraphQLClient extends GraphQLClient {
  setToken: (token: string) => GraphQLClient
  withAccountToken: (p?: {
    email: string
    password: string
  }) => Promise<{
    account: {
      email: string
      password: string
    }
    accountParams: {
      email: string
      password: string
    }
  }>
}

export const createGqlClient = ($port?: any): TestGraphQLClient => {
  const port = $port || process.env.PORT || 4000
  const client: TestGraphQLClient = new GraphQLClient(`http://0.0.0.0:${port}/graphql`) as any

  client.setToken = (token: string) => client.setHeader('x-access-token', token)

  client.withAccountToken = async ($accountParams: any) => {
    const accountParams = $accountParams || genAccountParams()

    await client.request(CREATE_ACCOUNT_MUTATION, accountParams)

    const { signIn: token } = await client.request<{ signIn: string }>(
      SIGN_IN_MUTATION,
      accountParams,
    )

    client.setToken(token)

    return { accountParams, account: accountParams }
  }

  return client
}
