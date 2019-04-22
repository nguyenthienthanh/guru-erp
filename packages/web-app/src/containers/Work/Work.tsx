import React from 'react'

import { Link } from 'react-router-dom'
import { AUTH_PATH, CREATE_ORG_PATH, ORG_LIST_PATH } from 'routes'

const Work = () => {
  return (
    <>
      Work <Link to={CREATE_ORG_PATH}>Create organization</Link>{' '}
      <Link to={AUTH_PATH}>Sign out</Link> <Link to={ORG_LIST_PATH}>Organizations</Link>
    </>
  )
}

export default Work
