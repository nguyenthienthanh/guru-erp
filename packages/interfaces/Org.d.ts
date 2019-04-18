import IAccount from './Account'
import IMember from './Member'

interface IOrg {
  id: string
  name: string
  namespace: string
  logo: string
  ownerId: string
  createdByAccountId: string
  createdByAccount?: IAccount
  createdByMember?: IMember
  status: 'pending' | 'active' | 'deactivated'
}

export default IOrg
