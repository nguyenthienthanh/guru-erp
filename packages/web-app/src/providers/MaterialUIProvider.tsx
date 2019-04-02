import React, { ReactNode } from 'react'

import { createMuiTheme, CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

// tslint:disable:import-name

import primary from '@material-ui/core/colors/blue'
import secondary from '@material-ui/core/colors/pink'
import { ComponentsProps } from '@material-ui/core/styles/props'

export const headingFontFamily =
  '"Product Sans", "SVN-Product Sans", "Roboto", "Helvetica", "Arial", sans-serif'

const MaterialUIProvider = ({
  children,
  type,
}: {
  children: ReactNode
  type?: 'light' | 'dark'
}) => {
  let theme = createMuiTheme({
    palette: {
      type,
      secondary,
      primary: {
        ...primary,
        light: '#63ccff',
        main: '#009be5',
        dark: '#006db3',
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      h6: { fontFamily: headingFontFamily },
      h5: {
        fontFamily: headingFontFamily,
        fontWeight: 500,
        fontSize: 26,
      },
      h4: { fontFamily: headingFontFamily },
      h3: { fontFamily: headingFontFamily },
      h2: { fontFamily: headingFontFamily },
      h1: { fontFamily: headingFontFamily },
    },
  })

  theme = {
    ...theme,
    overrides: {
      MuiButton: {
        label: {
          textTransform: 'initial',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
      MuiTooltip: {
        tooltip: {
          borderRadius: 4,
          backgroundColor: '#18202c',
          fontSize: '0.75rem',
        },
      },
      MuiDivider: {
        root: {
          backgroundColor: '#404854',
        },
      },
      MuiListItemIcon: {
        root: {
          marginRight: 0,
        },
      },
    },
    props: {
      MuiDivider: {
        light: true,
      },
      MuiContainer: {
        maxWidth: 'md',
      },
    } as ComponentsProps,
    mixins: {
      ...theme.mixins,
      toolbar: {
        minHeight: 64,
      },
    },
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default MaterialUIProvider
