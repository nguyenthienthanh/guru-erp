import { IAccount } from '@guru-erp/interfaces'
import { orgName, orgNamespace } from '@guru-erp/validator'
import { ServiceBroker } from 'moleculer'
import MongoMemoryServer from 'mongodb-memory-server'
import chance from 'utils/chance'
import { genAccountParams } from 'utils/mocks/accounts.mocks'
import { genOrgParams } from 'utils/mocks/orgs.mocks'
import { createTestBroker, loadAllServices, mockMongoServer, randEnvPort } from 'utils/testing'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

const createOrgAction = 'orgs.createOrg'
const findOrgByIdOrNamespaceAction = 'orgs.findOrgByIdOrNamespace'

describe('Test orgs service', () => {
  let broker: ServiceBroker
  let mongoServer: any

  beforeAll(async () => {
    mongoServer = await mockMongoServer()
    await randEnvPort()

    broker = await createTestBroker()
    await loadAllServices(broker)
    await broker.start()
  })

  afterAll(async () => {
    await broker.stop()
    await mongoServer.stop()
  })

  describe('Test org params validation', () => {
    it('should throw error if name is too short', () => {
      try {
        orgName.validateSync(chance.string({ length: 2 }))
      } catch (error) {
        expect(error.type).toBe('min')
      }
    })
    it('should throw error if name is too long', () => {
      try {
        orgName.validateSync(chance.string({ length: 25 }))
      } catch (error) {
        expect(error.type).toBe('max')
      }
    })
    it('should throw error if name contains more than 1 space continuously', () => {
      try {
        orgName.validateSync('  bad   string here  ')
      } catch (error) {
        expect(error.message).toBe('org_name_is_invalid')
      }
    })
    it('should normalize org name correctly', () => {
      const normalizedName = orgName.validateSync('   bad name here    ')
      expect(normalizedName).toBe('bad name here')
    })

    it('should throw error if namespace is too short', () => {
      try {
        orgNamespace.validateSync(chance.string({ length: 2 }))
      } catch (error) {
        expect(error.type).toBe('min')
      }
    })
    it('should throw error if namespace is too long', () => {
      try {
        orgNamespace.validateSync(chance.string({ length: 21 }))
      } catch (error) {
        expect(error.type).toBe('max')
      }
    })
    it('should throw error if namespace contains chars that are not letters nor numbers', () => {
      try {
        orgNamespace.validateSync('bad string')
      } catch (error) {
        expect(error.message).toBe('org_namespace_is_invalid')
      }
      try {
        orgNamespace.validateSync('bad@string')
      } catch (error) {
        expect(error.message).toBe('org_namespace_is_invalid')
      }
      try {
        orgNamespace.validateSync('badSTring')
      } catch (error) {
        expect(error.message).toBe('org_namespace_is_invalid')
      }
    })
    it('should validate correctly', () => {
      expect(orgNamespace.validateSync('goodnamespace10')).toBe('goodnamespace10')
    })
  })

  describe('Test orgs.createOrg action', () => {
    let account: IAccount

    beforeAll(async () => {
      account = await broker.call('accounts.createAccount', genAccountParams())
    })

    it('should throw error if ctx.meta.account is empty', async () => {
      expect.assertions(1)

      try {
        await broker.call(createOrgAction, genOrgParams(), { meta: {} })
      } catch (error) {
        expect(error).toMatchObject({ type: 'auth:unauthorized' })
      }
    })
    it('should throw error if name is empty', async () => {
      expect.assertions(1)

      try {
        await broker.call(createOrgAction, { namespace: 'goodnamespace' }, { meta: { account } })
      } catch (error) {
        expect(error).toMatchObject({
          code: 422,
          data: {
            type: 'required',
            path: 'name',
          },
        })
      }
    })

    it('should throw error if namespace is empty', async () => {
      expect.assertions(1)

      try {
        await broker.call(createOrgAction, { name: genOrgParams().name }, { meta: { account } })
      } catch (error) {
        expect(error).toMatchObject({ code: 422, data: { type: 'required', path: 'namespace' } })
      }
    })
    it('should throw error if the namespace is taken by another org', async () => {
      expect.assertions(1)
      try {
        const namespace = genOrgParams().namespace
        await broker.call(createOrgAction, { ...genOrgParams(), namespace }, { meta: { account } })
        await broker.call(createOrgAction, { ...genOrgParams(), namespace }, { meta: { account } })
      } catch (error) {
        expect(error).toMatchObject({
          code: 11000,
        })
      }
    })

    it('created org should have correct createdByAccountId, status should be active', async () => {
      expect.assertions(3)
      const orgParams = genOrgParams()
      const org = await broker.call(createOrgAction, orgParams, { meta: { account } })

      expect(org).toMatchObject(orgParams)
      expect(org.createdByAccountId.toString()).toBe(account.id)
      expect(org.status).toBe('active')
    })
  })

  describe('Test orgs.findOrgByIdOrNamespace action', () => {
    let account: IAccount

    beforeAll(async () => {
      account = await broker.call('accounts.createAccount', genAccountParams())
    })

    it('should throw error if both id and namespace are empty', async () => {
      expect.assertions(1)

      try {
        await broker.call(findOrgByIdOrNamespaceAction, {}, { meta: { account } })
      } catch (error) {
        expect(error).toMatchObject({ code: 422, data: { path: 'id' } })
      }
    })
    it('should return null if id does not exist', async () => {
      await expect(
        broker.call(
          findOrgByIdOrNamespaceAction,
          { id: '5b360fdea392d731829ded18' },
          { meta: { account } },
        ),
      ).resolves.toBe(null)
    })
    it('should return null if namespace does not exist', async () => {
      await expect(
        broker.call(
          findOrgByIdOrNamespaceAction,
          { namespace: 'anamespace' },
          { meta: { account } },
        ),
      ).resolves.toBe(null)
    })
    it('should throw unauthorized error if ctx.meta.account is empty', async () => {
      try {
        const org = await broker.call(createOrgAction, genOrgParams(), { meta: { account } })
        expect(org).toBeDefined()

        await broker.call(findOrgByIdOrNamespaceAction, { id: org.id })
      } catch (error) {
        expect(error).toMatchObject({
          code: 401,
          type: 'auth:unauthorized',
        })
      }
    })

    it('should resolve correct org with id', async () => {
      const org = await broker.call(createOrgAction, genOrgParams(), { meta: { account } })
      await expect(
        broker.call(findOrgByIdOrNamespaceAction, { id: org.id }, { meta: { account } }),
      ).resolves.toMatchObject({
        name: org.name,
        namespace: org.namespace,
        id: org.id,
      })
    })
    it('should resolve correct org with namespace', async () => {
      const org = await broker.call(createOrgAction, genOrgParams(), { meta: { account } })
      await expect(
        broker.call(
          findOrgByIdOrNamespaceAction,
          { namespace: org.namespace },
          { meta: { account } },
        ),
      ).resolves.toMatchObject({
        name: org.name,
        namespace: org.namespace,
        id: org.id,
      })
    })
  })
})
