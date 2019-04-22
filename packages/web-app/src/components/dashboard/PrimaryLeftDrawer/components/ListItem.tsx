import React from 'react'

import { ButtonBase, Grid, makeStyles, Theme, Tooltip } from '@material-ui/core'
import { ButtonBaseProps } from '@material-ui/core/ButtonBase'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

export type ListItemProps = {
  icon: React.ComponentType<SvgIconProps>
  label: string | JSX.Element
  active?: boolean
  onClick?: ButtonBaseProps['onClick']
  to?: string
}

const ListItem = (props: ListItemProps) => {
  const classes = useStyles(props)

  const Icon = props.icon

  const Container = (itemProps: any) =>
    props.to ? <Link to={props.to} {...itemProps} /> : <div {...itemProps} />

  return (
    <Grid item>
      <Container>
        <Tooltip title={props.label} placement="right" disableFocusListener>
          <ButtonBase
            onClick={props.onClick}
            className={classNames(classes.root, { active: props.active })}
          >
            <Icon color="inherit" />
          </ButtonBase>
        </Tooltip>
      </Container>
    </Grid>
  )
}

const useStyles = makeStyles(({ palette, shape }: Theme) => ({
  root: {
    background: 'transparent',
    height: 30,
    minWidth: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: shape.borderRadius / 2,
    color: palette.text.primary,
    transition: 'color .3s, background .3s',

    '&.active': {
      color: palette.primary.main,
      background: palette.common.white,
    },
  },
}))

export default ListItem
