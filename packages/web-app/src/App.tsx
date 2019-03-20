import React, { Component } from 'react'

import MaterialUIProvider from 'providers/MaterialUIProvider'

import logoSvg from './logo.svg'

import { Button } from '@material-ui/core'
import './App.css'

class App extends Component {
  render() {
    return (
      <MaterialUIProvider>
        <div className="App">
          <header className="App-header">
            <img src={logoSvg} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <Button variant="contained" color="primary">
              Learn React
            </Button>
          </header>
        </div>
      </MaterialUIProvider>
    )
  }
}

export default App
