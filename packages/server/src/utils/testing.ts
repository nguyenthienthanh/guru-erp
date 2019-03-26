import { default as getPort } from 'get-port'
import { ServiceBroker } from 'moleculer'
import MongoMemoryServer from 'mongodb-memory-server'

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

  broker.createService(gatewayService)
  broker.createService(accountsService)

  return broker
}

export const randEnvPort = async () => {
  process.env.PORT = (await getPort()).toString()
}

export const mockMongoServer = async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000
  const mongoServer = new MongoMemoryServer()
  process.env.MONGO_URI = await mongoServer.getConnectionString()
  return mongoServer
}
