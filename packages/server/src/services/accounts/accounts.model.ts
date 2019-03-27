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

const MONGO_URI = getServiceEnv('accounts', 'MONGO_URI') as string

// tslint:disable-next-line:variable-name
const Account = createModel<AccountDocument>('Account', accountsSchema, MONGO_URI)

export default Account
