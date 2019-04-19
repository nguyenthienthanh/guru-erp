import React from 'react'

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { AUTH_PATH, CREATE_ORG_PATH, WORK_PATH } from 'routes'

import Spinner from 'components/shared/Spinner'
import CreateOrg from 'containers/CreateOrg'
import SignInSignUp from 'containers/SignInSignUp'
import Work from 'containers/Work'

const RootRouter = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<Spinner variant="full-screen" />}>
        <Switch>
          <Route path={AUTH_PATH} component={SignInSignUp} />
          <Route path={WORK_PATH} component={Work} />

          <Route path={CREATE_ORG_PATH} component={CreateOrg} />

          <Redirect to={WORK_PATH} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default RootRouter
