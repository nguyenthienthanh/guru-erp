import { Document } from 'mongoose'
import { Service, Context } from 'moleculer'

import { IAccount } from '@guru-erp/interfaces'

import accountsMethods from './accounts.methods'

export type AccountDocument = Document & IAccount
export type AccountsMethods = typeof accountsMethods
export type AccountsService = Service & AccountsMethods
export type AccountsContext = Context & {
  service: AccountsService
  meta: {
    account: IAccount
    accountId: IAccount['id']
  }
}
