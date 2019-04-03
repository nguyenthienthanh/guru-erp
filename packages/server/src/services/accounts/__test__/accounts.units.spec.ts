import { compare } from 'bcrypt'
import { verify } from 'jsonwebtoken'
import MongoMemoryServer from 'mongodb-memory-server'
import chance from 'utils/chance'
import { createTestBroker, loadAllServices, mockMongoServer, randEnvPort } from 'utils/testing'

const genAccount = () => ({
  email: chance.email(),
  password: '123456',
})

describe('accounts service', () => {
  const broker = createTestBroker()
  let mongoServer: MongoMemoryServer

  beforeAll(async () => {
    mongoServer = await mockMongoServer()
    await randEnvPort()

    loadAllServices(broker)
    await broker.start()
  })
  afterAll(async () => {
    await broker.stop()
    await mongoServer.stop()
  })
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should start without crashing', async () => {
    expect.assertions(1)

    const service = await broker.getLocalService('accounts')

    expect(service).toBeDefined()
  })

  describe('test accounts.createAccount action', () => {
    it('should throw error if email is empty or invalid', async () => {
      expect.assertions(2)
      const accountParams = {
        email: 'bad_email',
        password: '123123',
      }
      try {
        await broker.call('accounts.createAccount', { password: '123123' })
      } catch (error) {
        expect(error).toMatchObject({
          code: 422,
          data: {
            path: 'email',
            type: 'required',
            message: 'email is a required field',
          },
        })
      }
      try {
        await broker.call('accounts.createAccount', accountParams)
      } catch (error) {
        expect(error).toMatchObject({
          code: 422,
          data: {
            path: 'email',
            message: 'email must be a valid email',
          },
        })
      }
    })

    it('should throw error if password is too short, too long or empty', async () => {
      expect.assertions(3)

      try {
        await broker.call('accounts.createAccount', {
          email: chance.email(),
        })
      } catch (error) {
        expect(error).toMatchObject({
          code: 422,
          data: {
            path: 'password',
            message: 'password is a required field',
            type: 'required',
          },
        })
      }

      try {
        await broker.call('accounts.createAccount', {
          email: chance.email(),
          password: chance.string({ length: 5 }),
        })
      } catch (error) {
        expect(error).toMatchObject({
          code: 422,
          data: {
            path: 'password',
            message: 'password must be at least 6 characters',
            type: 'min',
          },
        })
      }

      try {
        await broker.call('accounts.createAccount', {
          email: chance.email(),
          password: chance.string({ length: 200 }),
        })
      } catch (error) {
        expect(error).toMatchObject({
          code: 422,
          data: {
            path: 'password',
            message: 'password must be at most 128 characters',
            type: 'max',
          },
        })
      }
    })

    it('should throw error if email is duplicated', async () => {
      const accountParams = genAccount()
      try {
        await broker.call('accounts.createAccount', accountParams)
        await broker.call('accounts.createAccount', accountParams)
      } catch (error) {
        expect(error).toMatchObject({
          code: 11000,
          type: 'accounts:duplicated_email',
          data: {
            path: 'email',
            params: {
              email: accountParams.email,
            },
          },
        })
      }
    })

    it('should create successfully', async () => {
      expect.assertions(2)
      const accountParams = genAccount()
      const account = await broker.call('accounts.createAccount', accountParams)
      expect(account).toMatchObject({ email: accountParams.email })
      expect(await compare(accountParams.password, account.password)).toBe(true)
    })
  })

  describe('test accounts.signIn action', () => {
    it('should throw error if email is empty or invalid', async () => {
      expect.assertions(2)
      try {
        await broker.call('accounts.signIn', {
          password: '123123',
        })
      } catch (error) {
        expect(error).toMatchObject({
          code: 422,
          data: {
            path: 'email',
            type: 'required',
            message: 'email is a required field',
          },
        })
      }

      try {
        await broker.call('accounts.signIn', {
          email: 'bad_email',
          password: '123123',
        })
      } catch (error) {
        expect(error).toMatchObject({
          code: 422,
          data: {
            path: 'email',
            message: 'email must be a valid email',
          },
        })
      }
    })

    it(`should throw error if email doesn't exist on database`, async () => {
      expect.assertions(1)
      try {
        await broker.call('accounts.signIn', genAccount)
      } catch (error) {
        expect(error).toMatchObject({
          code: 404,
          type: 'accounts:account_not_found',
          data: { path: 'email' },
        })
      }
    })

    it(`should throw error if password is incorrect`, async () => {
      expect.assertions(1)
      const accountParams = genAccount()
      try {
        await broker.call('accounts.createAccount', accountParams)
        await broker.call('accounts.signIn', {
          email: accountParams.email,
          password: 'bad_password',
        })
      } catch (error) {
        expect(error).toMatchObject({
          code: 400,
          type: 'accounts:sign_in_wrong_password',
          data: {
            path: 'password',
          },
        })
      }
    })

    it('should return a valid JWT', async () => {
      expect.assertions(1)
      const accountParams = genAccount()

      await broker.call('accounts.createAccount', accountParams)
      const jwt = await broker.call('accounts.signIn', accountParams)

      expect(await verify(jwt, process.env.JWT_SECRET)).toMatchObject({
        email: accountParams.email,
      })
    })
  })

  describe('test accounts.authenticate action', () => {
    it('should be falsy (undefined or null) if the context.account is not set', async () => {
      const account = await broker.call('accounts.authenticate')
      expect(account).toBeFalsy()
    })
    it('should return exactly context.meta.account value', async () => {
      const accountParams = genAccount()
      const account = await broker.call(
        'accounts.authenticate',
        {},
        {
          meta: {
            account: accountParams,
          },
        },
      )
      expect(account).toMatchObject(accountParams)
    })
  })
})
