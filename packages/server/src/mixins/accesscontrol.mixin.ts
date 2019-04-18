import { IAccount, IMember } from '@guru-erp/interfaces'
import { Context, Errors, ServiceSchema } from 'moleculer'

const accesscontrolMixin: ServiceSchema = {
  name: 'accesscontrol',
  hooks: {
    before: {
      '*': [
        /** Check if action requires `context.meta.account` */
        async function doesRequireAccount(ctx: Context) {
          if (!ctx.action.requiresAccount) return

          // Check if `ctx.meta.account` defined
          if (!(ctx.meta.accountId || ctx.meta.account)) ctx.service.throwUnauthorizedError(ctx)

          const account = await ctx.call<IAccount>('accounts.findAccountById', {
            id: ctx.meta.accountId || ctx.meta.account.id,
          })

          if (!account) ctx.service.throwUnauthorizedError(ctx)

          ctx.meta.account = account
          ctx.meta.accountId = account.id
        },

        /** Checks if action requires `ctx.meta.member` */
        async function doesRequireMember(ctx: Context) {
          if (!ctx.action.requiresMember) return

          if (!ctx.meta.member) ctx.service.throwMemberRequiredError(ctx)

          const member = await ctx.call<IMember>('members.findMemberById', {
            id: ctx.meta.member.id,
          })

          if (!member) ctx.service.throwMemberRequiredError(ctx)

          ctx.meta.member = member
          ctx.meta.memberId = member.id
        },
      ],
    },
  },
  methods: {
    throwUnauthorizedError: (ctx?: Context) => {
      if (ctx) ctx.service.logger.error(`[${ctx.action.name}] Unauthorized`)
      throw new Errors.MoleculerClientError(
        'Unauthorized. You need to sign in to perform this action.',
        401,
        'auth:unauthorized',
      )
    },
    throwMemberRequiredError: (ctx?: Context) => {
      if (ctx) ctx.service.logger.error(`[${ctx.action.name}] Member is required`)
      throw new Errors.MoleculerClientError('Member is required', 403, 'auth:member_required')
    },
  },
}

export default accesscontrolMixin
