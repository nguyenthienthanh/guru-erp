import { Types } from 'mongoose'
import chance from 'utils/chance'

export const genMemberParams = (p: any = {}) => ({
  orgId: Types.ObjectId().toHexString(),
  accountId: Types.ObjectId().toHexString(),
  membership: 'pending',
  username: `test.${chance.word()}`,
  ...p,
})
