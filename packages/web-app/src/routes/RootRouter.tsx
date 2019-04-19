import React from 'react'

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { AUTH_PATH, WORK_PATH } from 'routes'

import Spinner from 'components/shared/Spinner'
import SignInSignUp from 'containers/SignInSignUp'
import Work from 'containers/Work'

const RootRouter = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<Spinner variant="full-screen" />}>
        <Switch>
          <Route path={AUTH_PATH} component={SignInSignUp} />
          <Route path={WORK_PATH} component={Work} />

          <Redirect to="/auth/sign-in" />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default RootRouter
