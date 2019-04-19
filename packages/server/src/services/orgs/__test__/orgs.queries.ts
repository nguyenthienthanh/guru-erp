import gql from 'graphql-tag'
import { ACCOUNT_FRAGMENT } from 'services/accounts/__test__/accounts.queries'
import { gqlToString } from 'utils/graphql'

export const ORG_FRAGMENT = gqlToString(gql`
  fragment OrgFragment on Org {
    id
    name
    namespace
    logo
    createdByAccountId
    createdByAccount {
      ...AccountFragment
    }
    # TODO: Update with fragment
    createdByMember {
      id
      membership
      roles
      username
    }
  }
  ${ACCOUNT_FRAGMENT}
`)

export const CREATE_ORG_MUTATION = gqlToString(gql`
  mutation CreateOrg($name: String!, $namespace: String!) {
    createOrg(name: $name, namespace: $namespace) {
      ...OrgFragment
    }
  }
  ${ORG_FRAGMENT}
`)
