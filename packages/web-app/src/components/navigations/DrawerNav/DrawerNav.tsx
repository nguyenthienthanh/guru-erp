import { defaults } from 'lodash'
import React from 'react'

import { Drawer, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import classNames from 'classnames'
import { DRAWER_NAV_WIDTH } from 'constants/variables'
import PrimaryDrawer from './components/PrimaryDrawer'
import SecondaryDrawer from './components/SecondaryDrawer'

export type DrawerNavProps = {
  /**
   * @default false
   */
  collapsed?: boolean
  classes?: any
}

const DrawerNav = (orgProps: DrawerNavProps) => {
  const defaultProps: DrawerNavProps = {
    collapsed: false,
    classes: {},
  }
  const props = defaults(orgProps, defaultProps)

  const classes = useStyles(props)
  const { collapsed } = props

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(classes.paper),
      }}
    >
      <PrimaryDrawer collapsed={collapsed} />
      <SecondaryDrawer />
    </Drawer>
  )
}

const useStyles = makeStyles(({ mixins, shape, transitions, palette }: Theme) => ({
  root: {},
  paper: {
    backgroundColor: palette.type === 'dark' ? '#18202c' : undefined,
    height: '100vh',
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'row',
    maxWidth: DRAWER_NAV_WIDTH,
  },
}))

export default DrawerNav
