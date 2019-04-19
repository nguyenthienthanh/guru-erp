import { ConnectionOptions } from 'mongoose'
import { createConnection } from 'utils/mongoose'
import { mockMongoServer } from 'utils/testing'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

const DEFAULT_OPTS: ConnectionOptions = {
  reconnectTries: 0,
}

describe('utils/mongoose', () => {
  beforeAll(async () => {
    await mockMongoServer()
  })
  it('should connect successfully', async () => {
    expect.assertions(1)
    const connection = createConnection(process.env.MONGO_URI, DEFAULT_OPTS)
    expect(connection).toBeDefined()
  })
})
