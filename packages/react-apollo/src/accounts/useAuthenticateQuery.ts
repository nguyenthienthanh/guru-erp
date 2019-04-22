import gql from 'graphql-tag'
import { QueryHookOptions, useQuery } from 'react-apollo-hooks'

import { IAccount } from '@guru-erp/interfaces'

const AUTHENTICATE_QUERY = gql`
  query Authenticate {
    account: authenticate {
      id
      email
      avatar
    }
  }
`

interface Data {
  account: {
    id: IAccount['id']
    email: IAccount['email']
    avatar: IAccount['avatar']
  }
}

interface Variables {}

export const useAuthenticateQuery = (opts?: QueryHookOptions<Data, Variables>) =>
  useQuery<Data, Variables>(AUTHENTICATE_QUERY, opts)
