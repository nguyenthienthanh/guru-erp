import { Document } from 'mongoose'
import { Service, Context } from 'moleculer'

import { IMember } from '@guru-erp/interfaces'

import membersMethods from './members.methods'

export type MemberDocument = Document & IMember
export type MembersMethods = typeof membersMethods
export type MembersService = Service & MembersMethods
export type MembersContext = Context & {
  service: MembersService
}
