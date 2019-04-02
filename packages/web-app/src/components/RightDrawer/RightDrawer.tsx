import React from 'react'

import {
  Avatar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Drawer,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core'
import { IconButtonProps } from '@material-ui/core/IconButton'
import classNames from 'classnames'
import { DRAWER_TRANSITION, RIGHT_DRAWER_APPS_WIDTH, RIGHT_DRAWER_WIDTH } from 'constants/variables'
import useRightDrawer from 'hooks/useRightDrawer'
import Bell from 'mdi-material-ui/Bell'
import CalendarText from 'mdi-material-ui/CalendarText'
import Close from 'mdi-material-ui/Close'
import DotsHorizontal from 'mdi-material-ui/DotsHorizontal'
import Inbox from 'mdi-material-ui/Inbox'
import Magnify from 'mdi-material-ui/Magnify'
import Pin from 'mdi-material-ui/Pin'
import Plus from 'mdi-material-ui/Plus'

export type RightDrawerProps = {
  open: boolean
}

const RightDrawer = (props: RightDrawerProps) => {
  const classes = useStyles()

  const [open, setOpen] = useRightDrawer()
  const collapsed = !open

  return (
    <Drawer
      open={open}
      anchor="right"
      variant="permanent"
      classes={{
        root: classes.root,
        paper: classNames(classes.drawerPaper, { collapsed }),
      }}
      PaperProps={{
        id: 'guru-right-drawer',
        elevation: 2,
      }}
    >
      <div className={classNames(classes.content, { collapsed })}>
        <div className={classes.heading}>
          <ListItemText
            primary="Inbox"
            secondary="20 messages"
            primaryTypographyProps={{
              variant: 'h6',
            }}
          />
          <div className={classes.headingActions}>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <Close fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <DotsHorizontal fontSize="small" />
            </IconButton>
          </div>
        </div>
        <div style={{ flex: 1, alignItems: 'center', display: 'flex', padding: 8 }} />
        <Divider />
      </div>
      <div className={classes.appsMenu}>
        <Grid container spacing={1} alignItems="center" direction="column">
          <AppIcon size="small">
            <Avatar
              style={{
                height: 36,
                width: 36,
              }}
            >
              D
            </Avatar>
          </AppIcon>
          <AppIcon>
            <Bell />
          </AppIcon>
          <AppIcon>
            <Magnify />
          </AppIcon>
          <Grid item style={{ width: '100%' }}>
            <Divider />
          </Grid>
          <AppIcon onClick={() => setOpen(true)}>
            <Inbox />
          </AppIcon>
          <AppIcon>
            <CalendarText />
          </AppIcon>
          <AppIcon>
            <Pin />
          </AppIcon>
          <Grid item style={{ width: '100%' }}>
            <Divider />
          </Grid>
          <AppIcon>
            <Plus />
          </AppIcon>
        </Grid>
        <Grid container spacing={1} justify="center" />
      </div>
    </Drawer>
  )
}

const AppIcon = ({
  children,
  onClick,
  size,
}: {
  children: JSX.Element
  onClick?: IconButtonProps['onClick']
  size?: IconButtonProps['size']
}) => {
  return (
    <Grid item>
      <IconButton onClick={onClick} size={size}>
        {children}
      </IconButton>
    </Grid>
  )
}

const useStyles = makeStyles(({ mixins, palette, spacing }: Theme) => ({
  root: {},
  drawerPaper: {
    width: RIGHT_DRAWER_WIDTH,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    borderLeft: 'none',

    '&.collapsed': {
      width: RIGHT_DRAWER_APPS_WIDTH,
    },
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

    '&.collapsed': {
      flexGrow: 0,
      width: 0,
    },
  },
  heading: {
    height: mixins.toolbar.minHeight,
    backgroundColor: palette.background.default,
    borderBottom: `solid 1px ${palette.divider}`,
    padding: spacing(0, 1, 0, 2),
    display: 'flex',
    alignItems: 'center',
  },
  headingActions: {
    display: 'flex',
    flexDirection: 'column',
  },
  appsMenu: {
    width: RIGHT_DRAWER_APPS_WIDTH,
    flexShrink: 0,
    borderLeft: `solid 1px ${palette.divider}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing(1, 0),
  },
}))

export default RightDrawer
