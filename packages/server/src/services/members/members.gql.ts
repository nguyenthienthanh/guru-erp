import gql from 'graphql-tag'

const memberGql = gql`
  type Member {
    id: ID!
    username: String
    account: Account
    org: Org
    membership: String
    roles: [String]
    lastActivity: Date
    availability: String
  }
`

export default memberGql
