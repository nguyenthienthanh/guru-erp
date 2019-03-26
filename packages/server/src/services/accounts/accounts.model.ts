import { getServiceEnv } from 'utils'
import { createModel, createSchema } from 'utils/mongoose'

import { AccountDocument } from './accounts'

const accountsSchema = createSchema({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: { type: String, default: 'gravatar' },
})

// tslint:disable-next-line:variable-name
const Account = createModel<AccountDocument>(
  'Account',
  accountsSchema,
  getServiceEnv('MONGO_URI', 'accounts'),
)

export default Account
