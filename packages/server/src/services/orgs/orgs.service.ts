import { ServiceSchema } from 'moleculer'
import { gqlToString } from 'utils/graphql'

import accesscontrolMixin from 'mixins/accesscontrol.mixin'

import orgsActions from './orgs.actions'
import orgsGql from './orgs.gql'
import orgsMethods from './orgs.methods'

const SERVICE_NAME = 'orgs'

const orgsService: ServiceSchema = {
  name: SERVICE_NAME,
  mixins: [accesscontrolMixin],
  settings: {
    graphql: {
      type: gqlToString(orgsGql),
      resolvers: {
        Org: {
          createdByAccount: {
            action: 'accounts.findAccountById',
            rootParams: {
              createdByAccountId: 'id',
            },
          },
          createdByMember: {
            action: 'members.findMemberByOrgIdAndAccountId',
            rootParams: {
              createdByAccountId: 'accountId',
              id: 'orgId',
            },
          },
        },
      },
    },
  },
  actions: orgsActions as any,
  methods: orgsMethods,
}

export = orgsService
