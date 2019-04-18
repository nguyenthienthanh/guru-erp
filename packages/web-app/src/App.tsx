import React from 'react'

import MaterialUIProvider from 'providers/MaterialUIProvider'
import { CookiesProvider } from 'react-cookie'

import ApolloProvider from 'providers/ApolloProvider'
import RootRouter from 'routes/RootRouter'

const App = () => {
  return (
    <CookiesProvider>
      <ApolloProvider>
        <MaterialUIProvider type="light">
          <RootRouter />
        </MaterialUIProvider>
      </ApolloProvider>
    </CookiesProvider>
  )
}

export default App
