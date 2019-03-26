import { createTestBroker, loadAllServices, mockMongoServer, randEnvPort } from 'utils/testing'

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
