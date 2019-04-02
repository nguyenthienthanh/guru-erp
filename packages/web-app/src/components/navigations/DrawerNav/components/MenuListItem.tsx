import { defaults } from 'lodash'
import React from 'react'

import { Collapse, List, ListItem, ListItemIcon, ListItemText, Theme } from '@material-ui/core'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import { makeStyles } from '@material-ui/styles'
import classNames from 'classnames'
import { Service } from 'constants/services'
import { headingFontFamily } from 'providers/MaterialUIProvider'

type MenuListItemProps = {
  label: string
  icon?: React.ComponentType<SvgIconProps>
  active?: boolean
  collapsed?: boolean
  onClick?: (event: Event) => void
  children?: Service[]
  variant?: 'default' | 'item'
}

const MenuListItem = (orgProps: MenuListItemProps) => {
  const defaultProps = {
    active: false,
    collapsed: false,
    onClick: () => {},
    variant: 'default',
  }
  const props = defaults(orgProps, defaultProps)

  const classes = useStyles(props)
  const { label, icon: Icon, active, onClick, collapsed, children } = props

  const isChild = props.variant === 'item'

  return (
    <>
      <ListItem
        button
        classes={{
          root: classes.root,
        }}
        onClick={onClick}
      >
        {Icon && (
          <ListItemIcon>
            <Icon color={active ? 'primary' : 'inherit'} />
          </ListItemIcon>
        )}
        <ListItemText
          classes={{
            root: classes.labelRoot,
            primary: classNames(classes.label, { isChild }),
          }}
          primaryTypographyProps={{
            color: active ? 'primary' : 'initial',
            noWrap: true,
            display: 'block',
            title: label,
          }}
          primary={label}
        />
      </ListItem>
      {!isChild && children && children.length && (
        <Collapse in={!collapsed}>
          <List disablePadding dense className={classes.childrenList}>
            {children.map((childItem) => {
              return (
                <MenuListItem
                  key={childItem.name}
                  variant="item"
                  label={childItem.label || childItem.name}
                />
              )
            })}
          </List>
        </Collapse>
      )}
    </>
  )
}

const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  root: {
    paddingLeft: spacing(2.5),
    paddingRight: spacing(2.5),
  },
  labelRoot: {
    paddingLeft: spacing(2.5),
  },
  label: {
    // fontFamily: headingFontFamily,
    // letterSpacing: 1.2,

    '&.isChild': {
      color: palette.text.secondary,
    },
  },
  childrenList: {
    overflow: 'hidden',
    marginLeft: spacing(5.5),
  },
}))

export default React.memo(MenuListItem)

// export default MenuListItem
