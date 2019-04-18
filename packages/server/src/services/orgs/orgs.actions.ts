import { IAccount, IMember } from '@guru-erp/interfaces'
import { createOrgParams, findOrgByIdOrNamespaceParams } from '@guru-erp/validator'
import { Action } from 'local-types'
import { Errors } from 'moleculer'
import { OrgsContext } from './orgs'
import orgsEvents from './orgs.events'
// tslint:disable-next-line:import-name
import Org from './orgs.model'

/**
 * Creates a new organization by an existing account. This action will:
 * - use account from ctx.meta.account
 * - create a new org with account.id
 * - emit an orgs:create_succeeded event
 */
const createOrg: Action = {
  requiresAccount: true,
  params: createOrgParams,
  graphql: {
    mutation: `createOrg(name: String, namespace: String): Org`,
  },
  async handler(ctx: OrgsContext) {
    const { name, namespace } = ctx.params
    const { account } = ctx.meta as { account: IAccount }

    // * 1. creates new org document
    let org = await ctx.service.createOrg(ctx, {
      name,
      namespace,
      createdByAccountId: account.id,
      status: 'active',
    })
    ctx.meta.org = org

    // * 2. create first member with accountId and orgId
    let member = await ctx.call<IMember>('members.createMember', {
      orgId: org.id,
      accountId: account.id,
      membership: 'active',
    })
    ctx.meta.member = member

    // * 3. add member (2.) to roles: member & admin
    member = await ctx.call<IMember>('members.updateMemberRoles', {
      memberId: member.id,
      roles: ['member', 'admin'],
    })

    // * 4. set org.ownerId to member.id
    org = await ctx.service.updateOrgById(ctx, org.id, { ownerId: member.id })

    return org
  },
}

const findOrgByIdOrNamespace: Action = {
  requiresAccount: true,
  params: findOrgByIdOrNamespaceParams,
  graphql: {
    query: `findOrgByIdOrNamespace(id: ID, namespace: String): Org`,
  },
  async handler(ctx: OrgsContext) {
    if (ctx.params.id) return Org.findOne({ _id: ctx.params.id })
    if (ctx.params.namespace) return Org.findOne({ namespace: ctx.params.namespace })
  },
}

const orgsActions = {
  createOrg,
  findOrgByIdOrNamespace,
}

export default orgsActions
