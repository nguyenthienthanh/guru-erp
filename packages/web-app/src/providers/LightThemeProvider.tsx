import React, { ReactNode } from 'react'

import { ThemeProvider } from '@material-ui/styles'
import { createTheme } from './MaterialUIProvider'

const theme = createTheme('light')

const LightThemeProvider = (props: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}

export default LightThemeProvider
