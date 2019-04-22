import { IOrg } from '@guru-erp/interfaces'

const orgs: IOrg[] = [
  {
    id: 'apple',
    name: 'Apple',
    namespace: 'apple',
    logo: 'https://image.flaticon.com/icons/png/512/23/23656.png',
    ownerId: 'fake',
    status: 'active',
    createdByAccountId: 'fake',
  },
  {
    id: 'marvel',
    name: 'Marvel Studio',
    namespace: 'marvel-studio',
    logo: 'http://thetechnews.com/wp-content/uploads/2018/03/2_The-latest-Marvel-logo.jpg',
    ownerId: 'fake',
    status: 'active',
    createdByAccountId: 'fake',
  },
  {
    id: 'targeek',
    name: 'Targeek JSC.',
    namespace: 'targeek',
    logo:
      'https://media.licdn.com/dms/image/C510BAQFRCOER2VPDfg/company-logo_200_200/0?e=2159024400&v=beta&t=3ol1NHa03HneCbIl4x7Y95IrIMT84Wy0YqzEuFMM-ys',
    ownerId: 'fake',
    status: 'active',
    createdByAccountId: 'fake',
  },
  {
    id: 'store',
    name: 'Store Làm Mộc',
    namespace: 'store',
    logo: 'initials',
    ownerId: 'fake',
    status: 'active',
    createdByAccountId: 'fake',
  },
]

export default orgs
