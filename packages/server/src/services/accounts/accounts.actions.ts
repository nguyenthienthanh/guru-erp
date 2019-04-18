import { createAccountParams, findAccountByIdParams, signInParams } from '@guru-erp/validator'
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Action } from 'local-types'
import { Errors } from 'moleculer'
import { AccountsContext } from './accounts'
import accountsEvents from './accounts.events'
// tslint:disable-next-line:import-name
import Account from './accounts.model'

/**
 * Creates a new account with email and password
 * @param {string} email
 * @param {string} password
 * @returns The created `account` document
 */
const createAccount: Action = {
  graphql: {
    mutation: `createAccount(email: String!, password: String!): Account`,
  },
  params: createAccountParams,
  async handler(ctx: AccountsContext) {
    const { email, password } = ctx.params
    const accountParams: {
      email: string
      password: string
    } = { email, password }

    ctx.service.logger.info(`[${ctx.action.name}] Creating new account`, accountParams)

    try {
      const account = await new Account({
        ...accountParams,
        password: await hash(accountParams.password, 10),
      }).save()

      ctx.service.logger.info(`[${ctx.action.name}] New account created`, account)
      ctx.emit(accountsEvents.CREATE_SUCCEEDED, { result: account, params: accountParams })

      return account
    } catch (error) {
      ctx.service.logger.error(`[${ctx.action.name}] Create account failed`)
      ctx.service.logger.error(error)
      ctx.emit(accountsEvents.CREATE_FAILED, { error, params: accountParams })

      if (error.code === 11000) {
        throw new Errors.MoleculerClientError(
          `Duplicated email`,
          11000,
          'accounts:duplicated_email',
          {
            error,
            params: accountParams,
            path: 'email',
          },
        )
      }

      /* istanbul ignore next line */
      throw new Errors.MoleculerServerError(
        `Couldn't create account`,
        error.code || 500,
        'accounts:create_account_failed',
        {
          error,
          params: accountParams,
        },
      )
    }
  },
}

/**
 * Generates a JWT with the given email and password
 * @param {string} email
 * @param {string} password
 */
const signIn: Action = {
  graphql: {
    mutation: `signIn(email: String!, password: String!): String`,
  },
  params: signInParams,
  async handler(ctx: AccountsContext) {
    const { email, password } = ctx.params

    ctx.service.logger.trace(`[${ctx.action.name}] sign in with`, { email })

    // Find account by email
    const account = await Account.findOne({ email })
    // If account not found, reject client error
    if (!account) {
      ctx.service.logger.trace(`[${ctx.action.name}] account with email ${email} not found`)

      const error = new Errors.MoleculerClientError(
        `Couldn't find account`,
        404,
        'accounts:account_not_found',
        {
          params: { email },
          path: 'email',
        },
      )

      ctx.emit(accountsEvents.SIGN_IN_FAILED, { error, params: { email, password } })

      throw error
    }

    // else, Compare passwords
    if (await compare(password, account.password)) {
      // If password is valid, encode account to jwt
      ctx.service.logger.trace(`[${ctx.action.name}] sign in successfully`)
      ctx.emit(accountsEvents.SIGN_IN_SUCCEEDED, account)
      return await sign(account.toJSON(), process.env.JWT_SECRET)
    }
    // else, reject client error
    ctx.service.logger.trace(`[${ctx.action.name}] sign in wrong password`, { email, password })
    const error = new Errors.MoleculerClientError(
      `Password is incorrect`,
      400,
      'accounts:sign_in_wrong_password',
      {
        params: { email },
        path: 'password',
      },
    )
    ctx.emit(accountsEvents.SIGN_IN_FAILED, { error, params: { email, password } })
    throw error
  },
}

/**
 * @returns An `ctx.meta.account` value
 */
const authenticate: Action = {
  graphql: {
    query: `authenticate: Account`,
  },
  async handler(ctx: AccountsContext) {
    return ctx.meta.account
  },
}

/**
 * Finds an account with ID field
 * @param {ObjectId} id
 * @returns {IAccount} an account document
 */
const findAccountById: Action = {
  params: findAccountByIdParams,
  async handler(ctx: AccountsContext) {
    const id: string = ctx.params.id

    ctx.service.logger.trace('[findAccountById] finding account with ID', id)

    const account = await Account.findById(id)

    if (account) ctx.service.logger.trace('[findAccountById] found account', account)
    else ctx.service.logger.trace('[findAccountById] account not found', ctx.params)

    return account
  },
}

const accountsActions = {
  authenticate,
  createAccount,
  signIn,
  findAccountById,
}

export default accountsActions
