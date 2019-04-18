import gql from 'graphql-tag'
import { gqlToString } from 'utils/graphql'

export const ACCOUNT_FRAGMENT = gql`
  fragment AccountFragment on Account {
    id
    email
    avatar
  }
`

export const CREATE_ACCOUNT_MUTATION = gqlToString(gql`
  mutation CreateAccount($email: String!, $password: String!) {
    createAccount(email: $email, password: $password) {
      ...AccountFragment
    }
  }
  ${ACCOUNT_FRAGMENT}
`)

export const SIGN_IN_MUTATION = gqlToString(gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`)

export const AUTHENTICATE_QUERY = gqlToString(gql`
  query Authenticate {
    authenticate {
      ...AccountFragment
    }
  }
  ${ACCOUNT_FRAGMENT}
`)
