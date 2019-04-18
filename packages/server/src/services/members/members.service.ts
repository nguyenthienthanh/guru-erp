import { ServiceSchema } from 'moleculer'
import { gqlToString } from 'utils/graphql'

import accesscontrolMixin from 'mixins/accesscontrol.mixin'

import membersActions from './members.actions'
import membersGql from './members.gql'
import membersMethods from './members.methods'

const SERVICE_NAME = 'members'

const membersService: ServiceSchema = {
  name: SERVICE_NAME,
  mixins: [accesscontrolMixin],
  settings: {
    graphql: {
      type: gqlToString(membersGql),
      resolvers: {
        Member: {
          org: {
            action: 'orgs.findOrgByIdOrNamespace',
            rootParams: {
              orgId: 'id',
            },
          },
          account: {
            action: 'accounts.findAccountById',
            rootParams: {
              accountId: 'id',
            },
          },
        },
      },
    },
  },
  actions: membersActions as any,
  methods: membersMethods,
}

export = membersService
