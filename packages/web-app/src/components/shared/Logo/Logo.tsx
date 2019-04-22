import React from 'react'

import { makeStyles, Theme, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import logoSvg from './logo.svg'

export type LogoProps = {
  classes?: Partial<Record<'text' | 'img' | 'root', string>>
  hideText?: boolean
  textColor?: string
  size?: number
}

const Logo = (props: LogoProps) => {
  const classes = useStyles(props)

  const imgStyle = {
    height: props.size,
    width: props.size,
    padding: +(props.size || 56) * 0.2,
  }
  const textStyle = {
    color: props.textColor,
    WebkitTextFillColor: props.textColor ? 'unset' : 'transparent',
    fontSize: +(props.size || 56) * 0.6,
  }

  return (
    <Link to="/" className={classes.root}>
      <img src={logoSvg} className={classes.img} style={imgStyle} />
      {!props.hideText && (
        <Typography variant="h5" className={classes.text} style={textStyle}>
          Guru ERP
        </Typography>
      )}
    </Link>
  )
}

const useStyles = makeStyles(({ palette, spacing, shape }: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: palette.secondary.main,
  },
  img: {
    height: 56,
    width: 56,
    borderRadius: shape.borderRadius,
    backgroundColor: palette.common.white,
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.15)',
  },
  text: {
    marginLeft: spacing(2),
    background: `-webkit-linear-gradient(45deg, ${palette.primary.light}, ${
      palette.secondary.light
    })`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
}))

export default Logo
