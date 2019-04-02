import { ServiceBroker } from 'moleculer'
import MongoMemoryServer from 'mongodb-memory-server'
import nodemailer from 'nodemailer'
import { getServiceEnv } from 'utils'
import chance from 'utils/chance'
import { createTestBroker, loadAllServices, mockMongoServer, randEnvPort } from 'utils/testing'
import mailerService = require('../mailer.service')

describe('mailer service', () => {
  let broker: ServiceBroker
  let mongoServer: MongoMemoryServer

  beforeAll(async () => {
    await randEnvPort()
    mongoServer = await mockMongoServer()

    broker = await createTestBroker()
    await broker.createService(mailerService)
    await broker.start()
  })
  afterAll(async () => {
    await broker.stop()
    await mongoServer.stop()
  })

  it('should be able to send test email', async () => {
    expect.assertions(1)
    const msg = await broker.call('mailer.sendMail', {
      to: getServiceEnv('mailer', 'AUTH_USER'),
      subject: chance.sentence(),
      text: chance.paragraph(),
    })
    expect(
      nodemailer
        .getTestMessageUrl(msg)
        .toString()
        .startsWith('https://ethereal.email/message/'),
    ).toBe(true)
  })
})
