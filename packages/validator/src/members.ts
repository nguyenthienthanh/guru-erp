import * as Yup from 'yup'

import { accountId } from './accounts'
import { objectId } from './common'
import { orgId } from './orgs'

const USERNAME_MIN_LENGTH = 3
const USERNAME_MAX_LENGTH = 24

export const memberId = objectId

export const username = Yup.string()
  .min(USERNAME_MIN_LENGTH)
  .max(USERNAME_MAX_LENGTH)
  .matches(/^[a-z]+([\.]?[a-z0-9])*$/)

export const membership = Yup.string().oneOf(['active', 'deactivated', 'pending'])

export const createMemberParams = Yup.object().shape({
  orgId: orgId.required(),
  accountId: accountId.required(),
  membership: membership.notRequired(),
  username: username.notRequired(),
})

export const updateMemberRolesParams = Yup.object().shape({
  memberId: memberId.required(),
  roles: Yup.array(Yup.string())
    .min(1)
    .required(),
})
