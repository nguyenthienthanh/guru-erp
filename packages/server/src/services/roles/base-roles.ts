import { RoleObject } from './roles'

const baseRoles: {
  [roleName: string]: RoleObject
} = {
  member: {
    member_list: {
      'read:any': ['*'],
    },
    member: {
      'read:any': ['*', '!password'],
      'update:own': ['username'],
    },
  },

  admin: {
    role: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    member: {
      'create:any': ['*'],
      'update:any': ['*'],
    },
    $extend: ['member'],
  },

  pending_member: {
    member: {
      'update:own': ['membership'],
    },
  },
}

export default baseRoles
