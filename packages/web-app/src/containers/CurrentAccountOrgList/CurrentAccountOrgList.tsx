import { get, orderBy } from 'lodash'
import React from 'react'

import { IMember } from '@guru-erp/interfaces'
import { useFindCurrentAccountMembersQuery } from '@guru-erp/react-apollo'
import { Container, Fade, Typography } from '@material-ui/core'
import ContentContainer from 'components/dashboard/ContentContainer'
import PageTitle from 'components/dashboard/PageTitle'
import PrimaryLeftDrawer from 'components/dashboard/PrimaryLeftDrawer'
import Logo from 'components/shared/Logo'
import Spinner from 'components/shared/Spinner'
import { MINI_DRAWER_NAV_WIDTH } from 'constants/variables'
import { Apps, Settings } from 'mdi-material-ui'
import { matchPath } from 'react-router'
import { ORG_LIST_PATH } from 'routes'
import useRouter from 'use-react-router'
import OrgList from './components/OrgList'

const CurrentAccountOrgList = () => {
  const { location } = useRouter()

  const { data, loading } = useFindCurrentAccountMembersQuery({ fetchPolicy: 'network-only' })

  const members: IMember[] = get(data, 'members', [])

  return (
    <Fade in>
      <div style={{ marginLeft: MINI_DRAWER_NAV_WIDTH }}>
        <PrimaryLeftDrawer
          logo={<Logo textColor="white" size={40} hideText />}
          bottomItems={[
            {
              key: 1,
              active: !!matchPath(location.pathname, {
                path: ORG_LIST_PATH,
              }),
              icon: Apps,
              label: 'Organizations',
            },
            {
              icon: Settings,
              label: 'Settings',
              to: '/settings',
            },
          ]}
        />

        <ContentContainer>
          <PageTitle>Your business organizations</PageTitle>

          {loading ? (
            <Spinner />
          ) : (
            <OrgList
              title="Recent organizations"
              members={orderBy(members, ['lastActivity', 'createdAt'], ['desc', 'desc'])}
            />
          )}
        </ContentContainer>
      </div>
    </Fade>
  )
}

export default CurrentAccountOrgList
