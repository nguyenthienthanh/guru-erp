import { get } from 'lodash'
import React from 'react'

import { useAuthenticateQuery } from '@guru-erp/react-apollo'
import { AUTH_PATH } from 'routes'
import useRouter from 'use-react-router'

const useCurrentAccount = () => {
  const { history } = useRouter()
  const { data } = useAuthenticateQuery({ suspend: true })
  const currentAccount = data && data.account
  if (!currentAccount) {
    history.push(AUTH_PATH)
  }
  return currentAccount
}

export default useCurrentAccount
