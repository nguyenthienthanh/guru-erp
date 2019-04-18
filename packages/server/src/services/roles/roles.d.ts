// import { Document } from 'mongoose'
// import { Service, Context } from 'moleculer'

// import { IRole } from '@guru-erp/interfaces'

// import rolesMethods from './roles.methods'

// export type RoleDocument = Document & IRole
// export type rolesMethods = typeof rolesMethods
// export type rolesService = Service & rolesMethods
// export type rolesContext = Context & {
//   service: rolesService
// }

export type RoleResource = 'member_list' | 'member' | 'role' | '$extend'
export type RoleAction =
  | 'create:any'
  | 'create:own'
  | 'update:any'
  | 'update:own'
  | 'read:any'
  | 'read:own'
  | 'delete:any'
  | 'delete:own'

export type RoleObject = {
  [resource in RoleResource]?: { [action in RoleAction]?: string[] } | string[]
}
