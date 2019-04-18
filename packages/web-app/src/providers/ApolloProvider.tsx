import React, { ReactNode } from 'react'

import { ApolloProvider as Provider, createClient } from '@guru-erp/react-apollo'
import { ACCESS_TOKEN_COOKIE } from 'constants/variables'
import { useCookies } from 'react-cookie'

const ApolloProvider = ({ children }: { children: ReactNode }) => {
  const [cookies] = useCookies()

  const token = cookies[ACCESS_TOKEN_COOKIE]

  const client = createClient(
    { uri: process.env.REACT_APP_SERVER_URI || '' },
    token && { 'x-access-token': token },
  )

  return <Provider client={client}>{children}</Provider>
}

export default ApolloProvider
