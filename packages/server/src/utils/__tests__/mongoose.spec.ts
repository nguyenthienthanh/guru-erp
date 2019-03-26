import { ConnectionOptions } from 'mongoose'
import { createConnection } from 'utils/mongoose'
import { mockMongoServer } from 'utils/testing'

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
