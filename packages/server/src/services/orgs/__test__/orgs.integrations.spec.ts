import { IOrg } from '@guru-erp/interfaces'
import { ServiceBroker } from 'moleculer'
import MongoMemoryServer from 'mongodb-memory-server'
import {
  CREATE_ACCOUNT_MUTATION,
  SIGN_IN_MUTATION,
} from 'services/accounts/__test__/accounts.queries'
import { genAccountParams } from 'utils/mocks/accounts.mocks'
import { genOrgParams } from 'utils/mocks/orgs.mocks'
import {
  createGqlClient,
  createTestBroker,
  loadAllServices,
  mockMongoServer,
  randEnvPort,
  TestGraphQLClient,
} from 'utils/testing'
import { CREATE_ORG_MUTATION } from './orgs.queries'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

describe('Integration test orgs service', () => {
  let broker: ServiceBroker
  let mongod: any
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

  describe(`test createOrg mutation`, () => {
    it(`should create successfully with resolved createdByAccount & createdByMember`, async () => {
      expect.assertions(4)

      const { account } = await gqlClient.withAccountToken()

      const orgParams = genOrgParams()

      const { createOrg: createdOrg } = await gqlClient.request<{ createOrg: IOrg }>(
        CREATE_ORG_MUTATION,
        orgParams,
      )

      expect(createdOrg).toMatchObject({
        name: orgParams.name,
        namespace: orgParams.namespace,
        logo: 'initials',
        createdByAccount: {
          email: account.email,
        },
      })

      expect(createdOrg.createdByMember.id.length).toBe(24)
      expect(createdOrg.createdByMember.membership).toBe('active')
      expect(createdOrg.createdByMember.username.startsWith('mem.')).toBe(true)
    })
  })
})
