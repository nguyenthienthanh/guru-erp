import gql from 'graphql-tag'

const memberGql = gql`
  type Member {
    id: ID!
    username: String
    account: Account
    org: Org
    membership: String
    roles: [String]
    availability: String
    lastActivity: Date
    createdAt: Date
  }
`

export default memberGql
