import { Document } from 'mongoose'
import { Service, Context, Action as MoleculerAction } from 'moleculer'

import { IOrg } from '@guru-erp/interfaces'

import orgsMethods from './orgs.methods'

export type OrgDocument = Document & IOrg
export type OrgsMethods = typeof orgsMethods
export type OrgsService = Service & OrgsMethods
export type OrgsContext = Context & {
  service: OrgsService
}
