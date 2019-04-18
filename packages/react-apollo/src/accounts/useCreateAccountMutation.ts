import gql from 'graphql-tag'
import { MutationHookOptions, useMutation } from 'react-apollo-hooks'

import { IAccount } from '@guru-erp/interfaces'

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($email: String!, $password: String!) {
    createAccount(email: $email, password: $password) {
      id
      email
    }
  }
`

interface Data {
  createAccount: {
    id: IAccount['id']
    email: IAccount['email']
  }
}

interface Variables {
  email: string
  password: string
}

export const useCreateAccountMutation = (opts?: MutationHookOptions<Data, Variables>) =>
  useMutation<Data, Variables>(CREATE_ACCOUNT_MUTATION, opts)
