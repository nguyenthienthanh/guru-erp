import { IAccount, IOrg } from '@guru-erp/interfaces'
import { membership, username } from '@guru-erp/validator/lib/members'
import { omit } from 'lodash'
import { CallingOptions, ServiceBroker } from 'moleculer'
import MongoMemoryServer from 'mongodb-memory-server'
import chance from 'utils/chance'
import { genAccountParams } from 'utils/mocks/accounts.mocks'
import { genMemberParams } from 'utils/mocks/members.mocks'
import { genOrgParams } from 'utils/mocks/orgs.mocks'
import { createTestBroker, loadAllServices, mockMongoServer, randEnvPort } from 'utils/testing'

const createMemberAction = 'members.createMember'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

describe('Test members service', () => {
  let broker: ServiceBroker
  let mongoServer: any
  let account: IAccount
  let org: IOrg
  let callOpts: CallingOptions

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

  beforeEach(async () => {
    account = await broker.call('accounts.createAccount', genAccountParams())
    callOpts = { meta: { account } }
    org = await broker.call('orgs.createOrg', genOrgParams(), callOpts)
  })

  describe('Test member params validation', () => {
    it(`should throw error if membership isn't supported`, async () => {
      await expect(membership.validate('bad_membership')).rejects.toMatchObject({ type: 'oneOf' })
      expect(membership.isValidSync('active')).toBe(true)
      expect(membership.isValidSync('deactivated')).toBe(true)
      expect(membership.isValidSync('pending')).toBe(true)
    })
    it(`should throw error if username is too short`, async () => {
      await expect(username.validate('hi')).rejects.toMatchObject({ type: 'min' })
    })
    it(`should throw error if username is too long`, async () => {
      await expect(username.validate(chance.string({ length: 25 }))).rejects.toMatchObject({
        type: 'max',
      })
    })
    it(`should throw error if username contains invalid chars`, () => {
      expect(username.isValidSync('contains spaces')).toBe(false)
      expect(username.isValidSync('UpperCase')).toBe(false)
      expect(username.isValidSync('has_underscore')).toBe(false)
      expect(username.isValidSync('h@s.special')).toBe(false)

      expect(username.isValidSync('good.username')).toBe(true)
      expect(username.isValidSync('good.username2')).toBe(true)
      expect(username.isValidSync('username2')).toBe(true)
    })
  })

  describe('Test members.createMember action', () => {
    it(`should throw error if orgId is empty`, async () => {
      expect.assertions(1)
      try {
        await broker.call(createMemberAction, omit(genMemberParams(), 'orgId'))
      } catch (error) {
        expect(error).toMatchObject({ code: 422, data: { type: 'required', path: 'orgId' } })
      }
    })
    it(`should throw error if accountId is empty`, async () => {
      expect.assertions(1)
      try {
        await broker.call(createMemberAction, omit(genMemberParams(), 'accountId'))
      } catch (error) {
        expect(error).toMatchObject({ code: 422, data: { type: 'required', path: 'accountId' } })
      }
    })
    it(`should throw error if orgId doesn't exist`, async () => {
      expect.assertions(1)
      try {
        await broker.call(createMemberAction, genMemberParams(), callOpts)
      } catch (error) {
        expect(error).toMatchObject({ code: 400, type: 'orgs:org_not_found' })
      }
    })
    it(`should throw error if accountId doesn't exist`, async () => {
      expect.assertions(1)
      try {
        await broker.call(createMemberAction, genMemberParams({ orgId: org.id }), callOpts)
      } catch (error) {
        expect(error).toMatchObject({ code: 400, type: 'accounts:account_not_found' })
      }
    })
    it(`should throw error if username has been taken in org`, async () => {
      expect.assertions(1)
      try {
        const member1 = await broker.call(
          createMemberAction,
          genMemberParams({ orgId: org.id, accountId: account.id }),
          callOpts,
        )
        const account2 = await broker.call('accounts.createAccount', genAccountParams())

        await broker.call(
          createMemberAction,
          genMemberParams({ orgId: org.id, accountId: account2.id, username: member1.username }),
          callOpts,
        )
      } catch (error) {
        expect(error).toMatchObject({
          code: 11000,
          type: 'members:duplicated_username_or_accountId',
        })
      }
    })
    it(`should throw error if accountId exists on org`, async () => {
      expect.assertions(1)
      try {
        const member1 = await broker.call(
          createMemberAction,
          genMemberParams({ orgId: org.id, accountId: account.id }),
          callOpts,
        )
        await broker.call(
          createMemberAction,
          genMemberParams({ accountId: member1.accountId, orgId: org.id }),
          callOpts,
        )
      } catch (error) {
        expect(error).toMatchObject({ code: 11000 })
      }
    })

    it(`should create successfully if username has been taken but in another org`, async () => {
      expect.assertions(1)

      const accountToBeAdded = await broker.call('accounts.createAccount', genAccountParams())

      const member1 = await broker.call(
        createMemberAction,
        genMemberParams({
          accountId: accountToBeAdded.id,
          orgId: org.id,
        }),
        callOpts,
      )
      const org2 = await broker.call('orgs.createOrg', genOrgParams(), callOpts)
      const member2 = await broker.call(
        createMemberAction,
        genMemberParams({
          accountId: accountToBeAdded.id,
          orgId: org2.id,
          username: member1.username,
        }),
        callOpts,
      )

      expect(member2).toMatchObject({
        username: member1.username,
      })
    })
    it(`should have correct createdByMemberId and default username`, async () => {
      expect.assertions(2)
      const accountToBeAdded = await broker.call('accounts.createAccount', genAccountParams())

      const member1 = await broker.call(
        createMemberAction,
        genMemberParams({
          accountId: accountToBeAdded.id,
          orgId: org.id,
        }),
        callOpts,
      )
      const account2 = await broker.call('accounts.createAccount', genAccountParams())
      const member2 = await broker.call(
        createMemberAction,
        genMemberParams({
          accountId: account2.id,
          orgId: org.id,
          username: undefined,
        }),
        { meta: { account, member: member1 } },
      )

      expect(member2.createdByMemberId.toString()).toBe(member1.id.toString())
      expect(member2.username.startsWith('mem.')).toBe(true)
    })
  })

  describe('Test members.findMembersByAccountId', () => {
    // TODO: Write test
    it(`should found created members`, async () => {})
  })
})
