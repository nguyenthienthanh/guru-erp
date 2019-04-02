import React from 'react'

import { Button, Container, Drawer, makeStyles, Portal, Theme, Typography } from '@material-ui/core'
import classNames from 'classnames'
import AppBar from 'components/navigations/AppBar'
import DrawerNav from 'components/navigations/DrawerNav'
import RightDrawer from 'components/RightDrawer'
import {
  DRAWER_NAV_WIDTH,
  DRAWER_TRANSITION,
  RIGHT_DRAWER_APPS_WIDTH,
  RIGHT_DRAWER_WIDTH,
} from 'constants/variables'
import useRightDrawer, { UseRightDrawerContainer } from 'hooks/useRightDrawer'

const Dashboard = () => {
  const classes = useStyles()

  const [collapsed, setCollapsed] = React.useState(true)
  const [rightDrawerOpen, setRightDrawerOpen] = useRightDrawer()

  return (
    <div>
      <DrawerNav collapsed={collapsed} />
      <RightDrawer open={rightDrawerOpen} />

      <div className={classNames(classes.mainContentWrapper, { rightDrawerOpen })}>
        {/* <AppBar /> */}
        <div className={classNames(classes.mainContent)}>
          <Container>
            <div
              style={{
                marginTop: 40,
                minHeight: 56,
                paddingTop: 8,
                textAlign: 'right',
              }}
            >
              <Typography variant="h4" color="inherit">
                Authentication
              </Typography>
            </div>
            <Button onClick={() => setCollapsed(!collapsed)}>toggle</Button>
            <Button onClick={() => setRightDrawerOpen(!rightDrawerOpen)}>toggle</Button>
            <div style={{ height: 4000 }}>askldfjlaksgjdsf</div>
            asd
          </Container>
        </div>
      </div>
    </div>
  )
}

const DashboardContainer = () => {
  return (
    <UseRightDrawerContainer.Provider>
      <Dashboard />
    </UseRightDrawerContainer.Provider>
  )
}

const useStyles = makeStyles(({ mixins }: Theme) => ({
  mainContentWrapper: {
    marginLeft: DRAWER_NAV_WIDTH,
    position: 'relative',
    marginRight: RIGHT_DRAWER_APPS_WIDTH,
    maxHeight: '100vh',
    overflow: 'hidden',
    '&.rightDrawerOpen': {
      marginRight: RIGHT_DRAWER_WIDTH,
    },
  },
  mainContent: {
    maxHeight: '100vh',
    overflow: 'auto',
  },
}))

export default DashboardContainer
