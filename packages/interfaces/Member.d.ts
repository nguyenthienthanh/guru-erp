import IOrg from './Org'
import IAccount from './Account'

interface IMember {
  id: string
  accountId: string
  orgId: string
  username: string
  membership: 'active' | 'deactivated' | 'pending'
  lastActivityAt: Date
  availability?: 'online' | 'offline' | 'inactive'
  roles: string[]
  org?: IOrg
  account?: IAccount
}

export default IMember
