import { createTestBroker, loadAllServices, mockMongoServer, randEnvPort } from 'utils/testing'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

describe('gateway service', () => {
  const broker = createTestBroker()

  beforeAll(async () => {
    await mockMongoServer()
    await randEnvPort()
    loadAllServices(broker)
    await broker.start()
  })
  afterAll(async () => {
    await broker.stop()
  })

  it('should start without crashing', async () => {
    expect.assertions(1)

    const service = await broker.getLocalService('gateway')

    expect(service).toBeDefined()
  })
})
