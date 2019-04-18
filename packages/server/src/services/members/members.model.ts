import { getServiceEnv } from 'utils'
import { createModel, createSchema } from 'utils/mongoose'

import { membership, username } from '@guru-erp/validator'
import { Types } from 'mongoose'
import { MemberDocument } from './members'

const membersSchema = createSchema({
  orgId: {
    type: Types.ObjectId,
    index: true,
    required: true,
  },
  accountId: {
    type: Types.ObjectId,
    index: true,
    required: true,
  },
  username: {
    type: String,
    index: true,
    required: true,
    validate: {
      validator: username.isValidSync,
    },
  },
  membership: {
    type: String,
    index: true,
    required: true,
    default: 'pending',
    enum: ['active', 'deactivated', 'pending'],
    validate: {
      validator: membership.isValidSync,
    },
  },
  roles: {
    type: [String],
    required: true,
    index: true,
    default: ['pending_member'],
  },
  createdByMemberId: {
    type: Types.ObjectId,
  },
  lastActivityAt: {
    type: Date,
    default: null,
    index: true,
  },
})

membersSchema.index({ orgId: 1, accountId: 1 }, { unique: true })
membersSchema.index({ orgId: 1, username: 1 }, { unique: true })

const MONGO_URI = getServiceEnv('members', 'MONGO_URI') as string

// tslint:disable-next-line:variable-name
const Member = createModel<MemberDocument>('Member', membersSchema, MONGO_URI)

export default Member
