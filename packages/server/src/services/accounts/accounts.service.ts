import { ServiceSchema } from 'moleculer'
import { gqlToString } from 'utils/graphql'

import accountsActions from './accounts.actions'
import accountsGql from './accounts.gql'
import accountsMethods from './accounts.methods'

const SERVICE_NAME = 'accounts'

const accountsService: ServiceSchema = {
  name: SERVICE_NAME,
  settings: {
    graphql: {
      type: gqlToString(accountsGql),
    },
  },
  actions: accountsActions as any,
  methods: accountsMethods,
}

export = accountsService
