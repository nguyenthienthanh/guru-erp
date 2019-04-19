import React from 'react'

import MaterialUIProvider from 'providers/MaterialUIProvider'
import { CookiesProvider } from 'react-cookie'

import GlobalStyles from 'containers/GlobalStyles'
import ApolloProvider from 'providers/ApolloProvider'
import RootRouter from 'routes/RootRouter'

const App = () => {
  return (
    <CookiesProvider>
      <ApolloProvider>
        <MaterialUIProvider type="light">
          <GlobalStyles>
            <RootRouter />
          </GlobalStyles>
        </MaterialUIProvider>
      </ApolloProvider>
    </CookiesProvider>
  )
}

export default App
