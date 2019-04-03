import { createAccountParams, signInParams } from '@guru-erp/validator'
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
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
const createAccount = {
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

    ctx.service.logger.info('[createAccount] Creating new account', accountParams)

    try {
      const account = await new Account({
        ...accountParams,
        password: await hash(accountParams.password, 10),
      }).save()

      ctx.service.logger.info('[createAccount] New account created', account)
      ctx.emit(accountsEvents.CREATE_SUCCEEDED, { result: account, params: accountParams })

      return account
    } catch (error) {
      ctx.service.logger.error('[createAccount] Create account failed')
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
const signIn = {
  graphql: {
    mutation: `signIn(email: String!, password: String!): String`,
  },
  params: signInParams,
  async handler(ctx: AccountsContext) {
    const { email, password } = ctx.params

    // Find account by email
    const account = await Account.findOne({ email })
    // If account not found, reject client error
    if (!account) {
      throw new Errors.MoleculerClientError(
        `Couldn't find account`,
        404,
        'accounts:account_not_found',
        {
          params: { email },
          path: 'email',
        },
      )
    }

    // else, Compare passwords
    if (await compare(password, account.password)) {
      // If password is valid, encode account to jwt
      return await sign(account.toJSON(), process.env.JWT_SECRET)
    }
    // else, reject client error
    throw new Errors.MoleculerClientError(
      `Password is incorrect`,
      400,
      'accounts:sign_in_wrong_password',
      {
        params: { email },
        path: 'password',
      },
    )
  },
}

/**
 * @returns An `ctx.meta.account` value
 */
const authenticate = {
  graphql: {
    query: `authenticate: Account`,
  },
  async handler(ctx: AccountsContext) {
    return ctx.meta.account
  },
}

const accountsActions = {
  authenticate,
  createAccount,
  signIn,
}

export default accountsActions
