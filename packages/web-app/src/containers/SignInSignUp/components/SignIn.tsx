import { get } from 'lodash'
import React from 'react'

import HappyFeeling from '@guru-erp/illustrations/lib/undraw/HappyFeeling'
import { useSignInMutation } from '@guru-erp/react-apollo'
import { signInParams } from '@guru-erp/validator/lib'
import { Typography } from '@material-ui/core'
import { Field, FieldProps, Formik } from 'formik'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import useRouter from 'use-react-router'
import { getFieldError, isFieldError, parseGraphQLErrors } from 'utils/formik'

import { ACCESS_TOKEN_COOKIE } from 'constants/variables'
import Helmet from 'react-helmet'
import { WORK_PATH } from 'routes'
import SignInSignUpLayout from './SignInSignUpLayout'

type SignInValues = typeof initialValues

const initialValues = {
  email: '',
  password: '',
}

const SignIn = () => {
  const { t } = useTranslation()
  const handleSignIn = useSignInMutation()
  const [cookies, setCookie, removeCookie] = useCookies()
  const { history, location } = useRouter()

  const initialEmail = get(location.state, 'email')

  if (initialEmail) initialValues.email = initialEmail

  React.useEffect(() => {
    if (cookies[ACCESS_TOKEN_COOKIE]) removeCookie(ACCESS_TOKEN_COOKIE, { path: '/' })
  }, [])

  return (
    <>
      <Helmet title={t('auth:sign_in')} />
      <SignInSignUpLayout
        image={HappyFeeling}
        form={({ TextField, SubmitButton, loading, setLoading }) => (
          <Formik
            initialValues={initialValues}
            validationSchema={signInParams}
            onSubmit={(values, actions) => {
              setLoading(true)
              handleSignIn({ variables: values })
                .then(({ data }) => {
                  const token = data && data.signIn

                  if (token) {
                    setCookie(ACCESS_TOKEN_COOKIE, token, { path: '/' })

                    history.push(WORK_PATH)
                  }
                })
                .catch((error) => {
                  console.error(parseGraphQLErrors(error.graphQLErrors))
                  actions.setErrors(parseGraphQLErrors(error.graphQLErrors))
                  setLoading(false)
                })
            }}
          >
            {(form) => (
              <>
                <Field name="email">
                  {({ field }: FieldProps<SignInValues>) => (
                    <TextField
                      autoFocus
                      label="Email"
                      name={field.name}
                      disabled={loading}
                      onChange={field.onChange}
                      onPressEnter={form.submitForm}
                      value={field.value}
                      helperText={getFieldError(field.name, form, t)}
                      error={isFieldError(field.name, form)}
                    />
                  )}
                </Field>
                <Field name="password">
                  {({ field }: FieldProps<SignInValues>) => (
                    <TextField
                      autoFocus={!form.errors.email && (!!form.errors.password || !!initialEmail)}
                      label="Password"
                      type="password"
                      name={field.name}
                      disabled={loading}
                      onChange={field.onChange}
                      onPressEnter={form.submitForm}
                      value={field.value}
                      helperText={getFieldError(field.name, form, t)}
                      error={isFieldError(field.name, form)}
                    />
                  )}
                </Field>

                <Typography color="error">{getFieldError('$form', form, t)}</Typography>

                <SubmitButton disabled={loading} onClick={form.submitForm}>
                  Sign in
                </SubmitButton>
              </>
            )}
          </Formik>
        )}
        formTitle="Sign in"
        direction="row-reverse"
        bottomText={
          <>
            <Typography variant="body2" display="inline" color="textSecondary">
              Don't have account yet?
            </Typography>{' '}
            <Typography display="inline" color="textPrimary">
              <Link to="/auth/sign-up">Sign up</Link>
            </Typography>
          </>
        }
      />
    </>
  )
}

export default SignIn
