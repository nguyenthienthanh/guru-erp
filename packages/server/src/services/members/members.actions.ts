import { cloneDeep, uniq } from 'lodash'
import moment from 'moment'

import { IMember } from '@guru-erp/interfaces'
import {
  createMemberParams,
  findMembersByAccountIdParams,
  updateMemberRolesParams,
} from '@guru-erp/validator'
import { Action } from 'local-types'
import { Errors } from 'moleculer'
import { MembersContext } from './members'
import membersEvents from './members.events'
// tslint:disable-next-line:import-name
import Member from './members.model'

/**
 * Creates a new member to an existing organization
 * @param orgId
 * @param accountId
 * @param membership
 * @param username
 * @returns A created member
 */
const createMember: Action = {
  // TODO: Add graphql mutation
  params: createMemberParams,
  requiresAccount: true,
  async handler(ctx: MembersContext) {
    const { orgId, accountId, membership = 'pending', username = `mem.${Date.now()}` } = ctx.params

    // reduce params object. if ctx.meta.member defined, set params.createdByMemberId
    const memberParams = {
      orgId,
      accountId,
      membership,
      username,
      createdByMemberId: ctx.meta.member && ctx.meta.member.id,
    }

    ctx.service.logger.trace(`[${ctx.action.name}] creating member with`, memberParams)

    //#region checks if orgId and accountId exist
    // Checks if orgId exists
    const org = await ctx.call('orgs.findOrgByIdOrNamespace', { id: orgId })

    if (!org) {
      ctx.service.logger.error(`[${ctx.action.name}] create failed. orgId not exists`)
      ctx.emit(membersEvents.CREATE_FAILED, {
        error: 'orgId_not_exists',
        params: memberParams,
      })

      throw new Errors.MoleculerClientError('orgId does not exist', 400, 'orgs:org_not_found')
    }
    // Checks if accountId exists
    const account = await ctx.call('accounts.findAccountById', { id: accountId })

    if (!account) {
      ctx.service.logger.error(
        `[${ctx.action.name}] create failed. accountId not exists`,
        memberParams,
      )
      ctx.emit(membersEvents.CREATE_FAILED, {
        error: 'accountId_not_exists',
        params: memberParams,
      })

      throw new Errors.MoleculerClientError(
        'accountId does not exists',
        400,
        'accounts:account_not_found',
      )
    }
    //#endregion

    try {
      // creates member document
      const createdMember = await Member.create(memberParams)

      ctx.service.logger.info(`[${ctx.action.name}] create succeeded`, createdMember.toJSON())
      ctx.emit(membersEvents.CREATE_SUCCEEDED, {
        result: createdMember.toJSON(),
        params: memberParams,
      })

      return createdMember
    } catch (error) {
      ctx.service.logger.error(`[${ctx.action.name}] create failed`, {
        error,
        params: memberParams,
      })
      ctx.emit(membersEvents.CREATE_FAILED, { error, params: memberParams })

      if (error.code === 11000) {
        throw new Errors.MoleculerClientError(
          'username or accountId is duplicated',
          11000,
          'members:duplicated_username_or_accountId',
          {
            error,
            params: memberParams,
            path: 'username',
          },
        )
      }

      throw error
    }
  },
}

/**
 * Given a member ID and a list of roles, update the member.roles with the given roles.
 * @param memberId
 * @param roles
 * @returns member document
 */
const updateMemberRoles: Action = {
  params: updateMemberRolesParams,
  requiresAccount: true,
  requiresMember: true,
  async handler(ctx: MembersContext) {
    const { memberId, roles } = ctx.params as { memberId: string; roles: string[] }
    // * 1. Checks if memberId exists and ctx.meta.member.orgId equals member.orgId
    const member = await Member.findOne({ _id: memberId, orgId: ctx.meta.member.orgId })

    if (!member) {
      // * 1.a. If memberId doesn't exist, throw a client error
      throw new Errors.MoleculerClientError(`memberId doesn't exist`, 404, 'member_not_found', {
        memberId,
      })
    }

    // clone current member data for post-comparison
    const prevMember = cloneDeep(member)

    // * 2. Updates member.roles. Role "member" should be always in the first order.
    const nextRoles = uniq(['member', ...roles])
    member.roles = nextRoles

    return member.save().then((updatedMember) => {
      ctx.emit(membersEvents.UPDATE_MEMBER_ROLES_SUCCEEDED, {
        prev: prevMember.toJSON(),
        next: member.toJSON(),
      })

      return updatedMember
    })
  },
}

const findMemberById: Action = {
  // TODO: Add validation
  requiresAccount: true,
  async handler(ctx: MembersContext) {
    return Member.findById(ctx.params.id)
  },
}

const findMemberByOrgIdAndAccountId: Action = {
  // TODO: Add validation
  async handler(ctx: MembersContext) {
    return Member.findOne({ accountId: ctx.params.accountId, orgId: ctx.params.orgId })
  },
}

const findMembersByAccountId: Action = {
  params: findMembersByAccountIdParams,
  async handler(ctx: MembersContext) {
    const accountId: string = ctx.params.accountId

    return Member.find({ accountId })
  },
}

const findCurrentAccountMembers: Action = {
  graphql: {
    query: 'findCurrentAccountMembers: [Member]',
  },
  async handler(ctx: MembersContext) {
    const accountId: string = ctx.meta.account.id

    return ctx.call('members.findMembersByAccountId', { accountId })
  },
}

const getMemberAvailabilityByLastActivity: Action = {
  async handler(ctx: MembersContext): Promise<IMember['availability']> {
    const lastActivity: any = ctx.params.lastActivity

    const diffMinutes = moment().diff(lastActivity, 'minutes')
    const diffDays = moment().diff(lastActivity, 'days')

    // TODO: Do not hard code!

    if (!lastActivity || diffDays >= 7) return 'inactive'
    if (diffMinutes <= 5) return 'online'
    return 'offline'
  },
}

const membersActions = {
  createMember,
  updateMemberRoles,
  findMemberById,
  findMemberByOrgIdAndAccountId,
  findMembersByAccountId,
  findCurrentAccountMembers,
  getMemberAvailabilityByLastActivity,
}

export default membersActions
