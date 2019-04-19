import React from 'react'

import { Container, makeStyles, Theme } from '@material-ui/core'
import { Route, RouteComponentProps, Switch } from 'react-router'

import Footer from './components/Footer'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

const SignInSignUp = (props: RouteComponentProps) => {
  const classes = useStyles()

  const {
    match: { url },
  } = props

  return (
    <Container maxWidth="lg">
      <aside className={classes.main}>
        <Switch>
          <Route path={`${url}/sign-in`} component={SignIn} />
          <Route path={`${url}/sign-up`} component={SignUp} />
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
