import { get } from 'lodash'
import React from 'react'

import { useAuthenticateQuery } from '@guru-erp/react-apollo'
import { Link } from 'react-router-dom'
import { AUTH_PATH, CREATE_ORG_PATH } from 'routes'

const Work = () => {
  const { data } = useAuthenticateQuery({ suspend: true })

  const authenticate = get(data, 'authenticate')

  if (!authenticate) {
    return (
      <div>
        Not authenticated <Link to={AUTH_PATH}>Authenticate</Link>
      </div>
    )
  }

  return (
    <>
      Work <Link to={CREATE_ORG_PATH}>Create organization</Link>{' '}
      <Link to={AUTH_PATH}>Sign out</Link>
    </>
  )
}

export default Work
