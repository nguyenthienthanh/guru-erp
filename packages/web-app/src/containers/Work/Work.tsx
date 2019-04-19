import { useAuthenticateQuery } from '@guru-erp/react-apollo'
import React from 'react'

const Work = () => {
  const account = useAuthenticateQuery({ suspend: true })
  console.log(account && account.data)
  return <>Work</>
}

export default Work
