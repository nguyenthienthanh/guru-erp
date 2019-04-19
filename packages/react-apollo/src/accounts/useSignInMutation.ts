import gql from 'graphql-tag'
import { MutationHookOptions, useMutation } from 'react-apollo-hooks'

const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`

interface Data {
  signIn: string
}

interface Variables {
  email: string
  password: string
}

export const useSignInMutation = (opts?: MutationHookOptions<Data, Variables>) =>
  useMutation<Data, Variables>(SIGN_IN_MUTATION, opts)
