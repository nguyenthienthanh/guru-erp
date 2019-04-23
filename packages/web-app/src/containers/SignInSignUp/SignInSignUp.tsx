import React from 'react'

import { Container, makeStyles, Theme } from '@material-ui/core'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'

import { SIGN_IN_PATH, SIGN_UP_PATH } from 'routes'

import Footer from './components/Footer'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

const SignInSignUp = (props: RouteComponentProps) => {
  const classes = useStyles(props)

  return (
    <Container maxWidth="lg">
      <aside className={classes.main}>
        <Switch>
          <Route path={SIGN_IN_PATH} component={SignIn} />
          <Route path={SIGN_UP_PATH} component={SignUp} />

          <Redirect to={SIGN_IN_PATH} />
        </Switch>
      </aside>
      <Footer />
    </Container>
  )
}

const useStyles = makeStyles(({ palette, spacing, mixins }: Theme) => ({
  main: {
    padding: spacing(8, 0),
    minHeight: `calc(100vh - ${mixins.toolbar.minHeight}px)`,
    display: 'flex',
    alignItems: 'center',
  },

  '@global': {
    body: {
      backgroundColor: palette.background.paper,
    },
  },
}))

export default SignInSignUp
