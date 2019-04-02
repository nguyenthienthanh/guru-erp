import React from 'react'

import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core'
import classNames from 'classnames'
import services from 'constants/services'
import { DRAWER_NAV_WIDTH, DRAWER_TRANSITION, MINI_DRAWER_NAV_WIDTH } from 'constants/variables'
import { useTranslation } from 'react-i18next'
import voca from 'voca'
import MenuListItem from './MenuListItem'

export type PrimaryDrawerProps = {
  collapsed?: boolean
}

const PrimaryDrawer = (props: PrimaryDrawerProps) => {
  const { collapsed } = props

  const classes = useStyles()
  const { t } = useTranslation('main')

  const [hover, setHover] = React.useState(false)
  const [active, setActive] = React.useState()

  return (
    <div
      className={classNames(classes.root, { collapsed })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={classes.orgInfo}>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.orgIcon}>SL</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Targeek Solution"
            primaryTypographyProps={{
              variant: 'h6',
              noWrap: true,
              display: 'block',
            }}
          />
        </ListItem>
      </div>
      <div className={classNames(classes.listsContainer, { collapsed })}>
        <List>
          {services
            .filter((svc) => svc.position !== 'bottom')
            .map((service) => {
              const serviceName = service.label || voca.capitalize(t(service.name))
              const handleSetActive = () => setActive(service.name)
              return (
                <MenuListItem
                  key={service.name}
                  label={serviceName}
                  icon={service.icon}
                  active={active === service.name}
                  onClick={handleSetActive}
                  collapsed={collapsed && !hover}
                  children={service.children}
                />
              )
            })}
        </List>
        <List>
          {services
            .filter((svc) => svc.position === 'bottom')
            .map((service) => {
              const serviceName = service.label || voca.capitalize(t(service.name))
              const handleSetActive = () => setActive(service.name)
              return (
                <MenuListItem
                  key={service.name}
                  label={serviceName}
                  icon={service.icon}
                  active={active === service.name}
                  onClick={handleSetActive}
                  collapsed={collapsed && !hover}
                  children={service.children}
                />
              )
            })}
        </List>
      </div>
    </div>
  )
}

const useStyles = makeStyles(({ mixins, shape, palette, spacing, shadows }: Theme) => ({
  root: {
    width: DRAWER_NAV_WIDTH,
    minWidth: DRAWER_NAV_WIDTH,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    transition: `width ${DRAWER_TRANSITION}, background-color ${DRAWER_TRANSITION}, min-width ${DRAWER_TRANSITION}`,
    backgroundColor: palette.background.paper,

    '&.collapsed': {
      width: MINI_DRAWER_NAV_WIDTH,
      minWidth: MINI_DRAWER_NAV_WIDTH,
      backgroundColor: palette.background.default,
    },
    '&:hover': {
      width: DRAWER_NAV_WIDTH - MINI_DRAWER_NAV_WIDTH,
      minWidth: DRAWER_NAV_WIDTH - MINI_DRAWER_NAV_WIDTH,
      backgroundColor: palette.background.default,
    },
  },
  orgInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -4,
    marginRight: -16,
  },
  orgIcon: {
    height: 40,
    width: 40,
    borderRadius: shape.borderRadius,
    boxShadow: shadows[2],
  },
  listsContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxHeight: `calc(100vh - 56px)`,
    overflowX: 'hidden',
    overflowY: 'auto',
  },
}))

export default PrimaryDrawer
