import * as Yup from 'yup'
import { objectId } from './common'

const ORG_NAME_MIN_LENGTH = 3
const ORG_NAME_MAX_LENGTH = 24

const ORG_NAMESPACE_MIN_LENGTH = 3
const ORG_NAMESPACE_MAX_LENGTH = 20

export const orgId = objectId

export const orgName = Yup.string()
  .min(ORG_NAME_MIN_LENGTH)
  .max(ORG_NAME_MAX_LENGTH)
  .trim()
  .matches(/^((?!(\s{2,})).)*$/, { message: 'org_name_is_invalid' })
export const orgNamespace = Yup.string()
  .min(ORG_NAMESPACE_MIN_LENGTH)
  .max(ORG_NAMESPACE_MAX_LENGTH)
  .lowercase()
  .trim()
  .matches(/^([a-z0-9])+$/, { message: 'org_namespace_is_invalid' })

export const createOrgParams = Yup.object().shape({
  name: orgName.required(),
  namespace: orgNamespace.required(),
})

export const findOrgByIdOrNamespaceParams = Yup.object({
  namespace: orgName,
  id: Yup.string().when('namespace', {
    is: (ns: string) => !ns,
    then: objectId.required(),
    otherwise: objectId,
  }),
})
