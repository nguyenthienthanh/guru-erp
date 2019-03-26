import gql from 'graphql-tag'

const accountsGql = gql`
  type Account {
    id: ID!
    email: String!
    avatar: String
  }
`

export default accountsGql
