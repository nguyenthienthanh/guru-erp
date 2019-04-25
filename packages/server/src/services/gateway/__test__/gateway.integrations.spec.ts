import gql from 'graphql-tag'
import { ServiceBroker } from 'moleculer'
import { gqlToString } from 'utils/graphql'
import {
  createGqlClient,
  createTestBroker,
  loadAllServices,
  mockMongoServer,
  randEnvPort,
  TestGraphQLClient,
} from 'utils/testing'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

describe('Integration test gateway service', () => {
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

  it('graphql request should response truthy x-server-version and x-server-sha in header', async () => {
    expect.assertions(2)
    const { headers } = await gqlClient.rawRequest(
      gqlToString(gql`
        query IntrospectionTypeQuery {
          __schema {
            types {
              name
            }
          }
        }
      `),
    )

    expect(headers.get('x-server-version')).toBeTruthy()
    expect(headers.get('x-server-sha')).toBeTruthy()
  })
})
