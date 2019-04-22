import React from 'react'

import Helmet from 'react-helmet'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { AUTH_PATH, CREATE_ORG_PATH, WORK_PATH } from 'routes'

import Spinner from 'components/shared/Spinner'
import CreateOrg from 'containers/CreateOrg'
import SignInSignUp from 'containers/SignInSignUp'
import WorkSwitch from './WorkSwitch'

const RootRouter = () => {
  return (
    <>
      <Helmet
        defaultTitle="Guru ERP – Modern ERP system for your happy business"
        titleTemplate="%s – Guru ERP"
      />
      <BrowserRouter>
        <React.Suspense fallback={<Spinner variant="full-screen" />}>
          <Switch>
            <Route path={AUTH_PATH} component={SignInSignUp} />
            <Route path={CREATE_ORG_PATH} component={CreateOrg} />

            <Route path={WORK_PATH} component={WorkSwitch} />

            <Redirect to={WORK_PATH} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </>
  )
}

export default RootRouter
