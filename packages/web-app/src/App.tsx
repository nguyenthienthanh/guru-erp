import React from 'react'

import MaterialUIProvider from 'providers/MaterialUIProvider'

import { Button, Typography } from '@material-ui/core'
import DrawerNav from 'components/navigations/DrawerNav'
import Dashboard from 'containers/Dashboard'
import { useTranslation } from 'react-i18next'

const App = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = () => {
    const currentLanguage = i18n.language

    i18n.changeLanguage(currentLanguage === 'vi' ? 'en' : 'vi')
  }

  return (
    <MaterialUIProvider type="light">
      <Dashboard />
    </MaterialUIProvider>
  )
}

export default App
