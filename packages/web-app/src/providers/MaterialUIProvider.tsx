import React, { ReactNode } from 'react'

import { createMuiTheme, CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

// tslint:disable:import-name

import primary from '@material-ui/core/colors/blue'
import secondary from '@material-ui/core/colors/pink'

const MaterialUIProvider = ({ children }: { children: ReactNode }) => {
  const theme = createMuiTheme({
    palette: {
      secondary,
      primary: {
        ...primary,
        light: '#63ccff',
        main: '#009be5',
        dark: '#006db3',
      },
      background: {
        default: '#ebeff1',
      },
    },
    shape: {
      borderRadius: 8,
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default MaterialUIProvider
