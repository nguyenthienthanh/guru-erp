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
  Typography,
} from '@material-ui/core'
import services from 'constants/services'
import { DRAWER_NAV_WIDTH, MINI_DRAWER_NAV_WIDTH } from 'constants/variables'
import { useTranslation } from 'react-i18next'
import voca from 'voca'
import MenuListItem from './MenuListItem'

const SecondaryDrawer = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>BT</Avatar>
        </ListItemAvatar>
        <ListItemText primary="Store Bình Thới" secondary="Dist.10, HCM" />
      </ListItem>
      <List>
        {services[1]
          .apps!.filter((svc) => svc.position !== 'bottom')
          .map((service) => {
            const serviceName = service.label || voca.capitalize(t(service.name))
            return (
              <MenuListItem
                key={service.name}
                label={serviceName}
                icon={service.icon}
                children={service.children}
              />
            )
          })}
      </List>
    </div>
  )
}

const useStyles = makeStyles(({ palette, mixins, spacing }: Theme) => ({
  root: {
    width: DRAWER_NAV_WIDTH - MINI_DRAWER_NAV_WIDTH,
  },
}))

export default SecondaryDrawer
