import { IMember } from '@guru-erp/interfaces'
import gql from 'graphql-tag'
import { QueryHookOptions, useQuery } from 'react-apollo-hooks'

const FIND_CURRENT_ACCOUNT_MEMBERS_QUERY = gql`
  query CurrentAccountMembers {
    members: findCurrentAccountMembers {
      id
      username
      availability
      lastActivity
      membership
      createdAt

      org {
        id
        name
        namespace
        logo

        createdByMember {
          id
          username
          account {
            id
            avatar
            email
          }
        }
      }
    }
  }
`

interface Data {
  members: IMember[]
}

interface Variables {}

export const useFindCurrentAccountMembersQuery = (opts?: QueryHookOptions<Data, Variables>) =>
  useQuery<Data, Variables>(FIND_CURRENT_ACCOUNT_MEMBERS_QUERY, opts)
