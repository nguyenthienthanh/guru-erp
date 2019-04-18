import gql from 'graphql-tag'
import { QueryHookOptions, useQuery } from 'react-apollo-hooks'

import { IAccount } from '@guru-erp/interfaces'

const AUTHENTICATE_QUERY = gql`
  query Authenticate {
    authenticate {
      id
      email
      avatar
    }
  }
`

interface Data {
  authenticate: {
    id: IAccount['id']
    email: IAccount['email']
    avatar: IAccount['avatar']
  }
}

interface Variables {}

export const useAuthenticateQuery = (opts?: QueryHookOptions<Data, Variables>) =>
  useQuery<Data, Variables>(AUTHENTICATE_QUERY, opts)
