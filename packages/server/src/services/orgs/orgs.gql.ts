import gql from 'graphql-tag'

const orgsGql = gql`
  type Org {
    id: ID!
    name: String
    namespace: String
    logo: String
    # objectId of the account which created the org
    createdByAccountId: String
    # resolved account by createdByAccountId
    createdByAccount: Account
    # resolved member by createdByAccountId and id
    createdByMember: Member
  }
`

export default orgsGql
