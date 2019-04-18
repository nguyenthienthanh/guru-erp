import { getServiceEnv } from 'utils'
import { createModel, createSchema } from 'utils/mongoose'

import { orgName, orgNamespace } from '@guru-erp/validator'
import { Types } from 'mongoose'
import { OrgDocument } from './orgs'

const orgsSchema = createSchema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: orgName.isValidSync,
    },
  },
  namespace: {
    type: String,
    required: true,
    index: true,
    unique: true,
    validate: {
      validator: orgNamespace.isValidSync,
    },
  },
  logo: {
    type: String,
    default: 'initials',
  },
  ownerId: {
    type: Types.ObjectId,
    index: true,
  },
  createdByAccountId: {
    type: Types.ObjectId,
    required: true,
    index: true,
  },
  status: {
    type: String,
    required: true,
    index: true,
    enum: ['pending', 'active', 'deactivated'],
    default: 'pending',
  },
})

const MONGO_URI = getServiceEnv('orgs', 'MONGO_URI') as string

// tslint:disable-next-line:variable-name
const Org = createModel<OrgDocument>('Org', orgsSchema, MONGO_URI)

Org.createIndexes()

export default Org
