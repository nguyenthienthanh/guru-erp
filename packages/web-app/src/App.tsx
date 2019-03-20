import React from 'react'

import MaterialUIProvider from 'providers/MaterialUIProvider'

import logoSvg from './logo.svg'

import { Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import './App.css'

const App = () => {
  const { t, i18n } = useTranslation()

  const changeLanguage = () => {
    const currentLanguage = i18n.language

    i18n.changeLanguage(currentLanguage === 'vi' ? 'en' : 'vi')
  }

  return (
    <MaterialUIProvider>
      <div className="App">
        <header className="App-header">
          <img src={logoSvg} className="App-logo" alt="logo" />
          <p>
            {t('hello')} {t('welcome')}
          </p>
          <Button variant="contained" color="primary" onClick={changeLanguage}>
            Change Language
          </Button>
        </header>
      </div>
    </MaterialUIProvider>
  )
}

export default App
