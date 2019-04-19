import { IOrg } from '@guru-erp/interfaces'
import gql from 'graphql-tag'
import { MutationHookOptions, useMutation } from 'react-apollo-hooks'

const CREATE_ORG = gql`
  mutation CreateOrg($name: String, $namespace: String) {
    createdOrg: createOrg(name: $name, namespace: $namespace) {
      id
      name
      namespace
    }
  }
`

interface Data {
  createdOrg: {
    id: IOrg['id']
    name: IOrg['name']
    namespace: IOrg['namespace']
  }
}

interface Variables {}

export const useCreateOrgMutation = (opts?: MutationHookOptions<Data, Variables>) =>
  useMutation<Data, Variables>(CREATE_ORG, opts)
