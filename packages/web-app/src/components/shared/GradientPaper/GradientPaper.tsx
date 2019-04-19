import React, { ReactNode } from 'react'

import { CssBaseline, makeStyles, Paper, Theme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import MaterialUIProvider, { createTheme } from 'providers/MaterialUIProvider'

export type GradientPaperProps = {
  light?: boolean
  gradientFrom?: string
  gradientTo?: string
  children: ReactNode
}

const theme = createTheme('dark')

const GradientPaper = (props: GradientPaperProps) => {
  const classes = useStyles(props)

  return <Paper className={classes.root}>{props.children}</Paper>
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
  <ThemeProvider theme={theme}>
    <GradientPaper {...props} />
  </ThemeProvider>
)
