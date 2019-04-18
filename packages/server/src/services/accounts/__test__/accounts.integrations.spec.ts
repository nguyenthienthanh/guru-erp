import { IAccount } from '@guru-erp/interfaces'
import { ServiceBroker } from 'moleculer'
import MongoMemoryServer from 'mongodb-memory-server'
import { genAccountParams } from 'utils/mocks/accounts.mocks'
import {
  createGqlClient,
  createTestBroker,
  loadAllServices,
  mockMongoServer,
  randEnvPort,
  TestGraphQLClient,
} from 'utils/testing'
import { AUTHENTICATE_QUERY, CREATE_ACCOUNT_MUTATION, SIGN_IN_MUTATION } from './accounts.queries'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

describe('Integration test accounts service', () => {
  let broker: ServiceBroker
  let mongod: MongoMemoryServer
  let gqlClient: TestGraphQLClient

  beforeAll(async () => {
    mongod = await mockMongoServer()
    await randEnvPort()

    broker = await createTestBroker()
    await loadAllServices(broker)
    await broker.start()

    gqlClient = createGqlClient()
  })

  afterAll(async () => {
    await broker.stop()
    await mongod.stop()
  })

  describe('test createAccount mutation', () => {
    it('should create account successfully and default avatar is "gravatar"', async () => {
      expect.assertions(2)
      const accountParams = genAccountParams()

      const { createAccount: account } = await gqlClient.request<{ createAccount: IAccount }>(
        CREATE_ACCOUNT_MUTATION,
        accountParams,
      )

      expect(account.email).toBe(accountParams.email)
      expect(account.avatar).toBe('gravatar')
    })
  })

  describe('test signIn mutation', () => {
    it('should return jwt if sign in successfully', async () => {
      expect.assertions(1)
      const accountParams = genAccountParams()

      await gqlClient.request(CREATE_ACCOUNT_MUTATION, accountParams)

      const { signIn } = await gqlClient.request<{ signIn: string }>(
        SIGN_IN_MUTATION,
        accountParams,
      )

      expect(typeof signIn).toBe('string')
    })
  })

  describe('test authenticate query', () => {
    it('should resolve correct account', async () => {
      expect.assertions(1)
      const { account: accountParams } = await gqlClient.withAccountToken()

      const { authenticate: account } = await gqlClient.request<{ authenticate: IAccount }>(
        AUTHENTICATE_QUERY,
      )

      expect(account).toMatchObject({
        email: accountParams.email,
        avatar: 'gravatar',
      })
    })
  })
})
