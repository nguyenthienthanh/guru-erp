import React from 'react'

import { Drawer, Grid, makeStyles, Theme } from '@material-ui/core'
import { MINI_DRAWER_NAV_WIDTH } from 'constants/variables'
import DarkThemeProvider from 'providers/DarkThemeProvider'
import ListItem, { ListItemProps } from './components/ListItem'

type ListItems = (ListItemProps & { key?: string | number })[]

type PrimaryLeftDrawerProps = {
  logo: JSX.Element
  topItems?: ListItems
  bottomItems?: ListItems
}

const PrimaryLeftDrawer = (props: PrimaryLeftDrawerProps) => {
  const classes = useStyles()

  return (
    <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        className={classes.gridContainer}
      >
        <Grid item>{props.logo}</Grid>
        <Grid item>
          <Grid container spacing={2} direction="column" alignItems="center">
            {(props.topItems || []).map(({ key, ...item }, idx) => (
              <ListItem key={key || `__li-${idx}`} {...item} />
            ))}
          </Grid>
        </Grid>
        <Grid item xs />
        <Grid item>
          <Grid container spacing={2} direction="column" alignItems="center">
            {(props.bottomItems || []).map(({ key, ...item }, idx) => (
              <ListItem key={key || `__li-${idx}`} {...item} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  )
}

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  drawerPaper: {
    background: `linear-gradient(${palette.primary.main}, ${palette.primary.dark})`,
    width: MINI_DRAWER_NAV_WIDTH,
    padding: spacing(2, 1.5, 2, 1.5),
  },
  gridContainer: {
    height: '100%',
  },
}))

export default (props: PrimaryLeftDrawerProps) => (
  <DarkThemeProvider>
    <PrimaryLeftDrawer {...props} />
  </DarkThemeProvider>
)
