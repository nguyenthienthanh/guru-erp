import React from 'react'

import CurrentAccountOrgList from 'containers/CurrentAccountOrgList'
import Work from 'containers/Work'
import useCurrentAccount from 'hooks/useCurrentAccount'
import { Route, Switch } from 'react-router'
import { ORG_LIST_PATH } from 'routes'

const WorkSwitch = () => {
  useCurrentAccount()

  return (
    <Switch>
      <Route path={ORG_LIST_PATH} component={CurrentAccountOrgList} />

      <Route component={Work} />
    </Switch>
  )
}

export default WorkSwitch
