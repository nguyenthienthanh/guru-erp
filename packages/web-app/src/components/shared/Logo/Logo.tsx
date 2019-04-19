import React from 'react'

import { makeStyles, Theme, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import logoSvg from './logo.svg'

export type LogoProps = {
  classes?: Partial<Record<'text' | 'img' | 'root', string>>
}

const Logo = (props: LogoProps) => {
  const classes = useStyles(props)

  return (
    <Link to="/" className={classes.root}>
      <img src={logoSvg} className={classes.img} />
      <Typography variant="h5" className={classes.text}>
        Guru ERP
      </Typography>
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
    marginRight: spacing(2),
    height: 56,
    width: 56,
    padding: spacing(1.5),
    borderRadius: shape.borderRadius,
    backgroundColor: palette.background.paper,
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.15)',
  },
  text: {
    background: `-webkit-linear-gradient(45deg, ${palette.primary.light}, ${
      palette.secondary.light
    })`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
}))

export default Logo
