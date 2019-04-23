import React, { ReactNode } from 'react'

import { makeStyles, Paper, Theme } from '@material-ui/core'
import DarkThemeProvider from 'providers/DarkThemeProvider'

export type GradientPaperProps = {
  light?: boolean
  gradientFrom?: string
  gradientTo?: string
  children: ReactNode
}

const GradientPaper = (props: GradientPaperProps) => {
  const classes = useStyles(props)

  return (
    <Paper elevation={2} className={classes.root}>
      {props.children}
    </Paper>
  )
}

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
    padding: spacing(7, 5),
    background: `linear-gradient(45deg, ${palette.primary.dark}, ${palette.primary.light})`,

    '& a': {
      color: palette.text.primary,
    },
  },
}))

export default (props: GradientPaperProps) => (
  <DarkThemeProvider>
    <GradientPaper {...props} />
  </DarkThemeProvider>
)
