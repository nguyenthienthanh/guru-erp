import React from 'react'

import Collab from '@guru-erp/illustrations/lib/undraw/Collab'
import { useCreateAccountMutation } from '@guru-erp/react-apollo'
import { createAccountParams } from '@guru-erp/validator'
import { Typography } from '@material-ui/core'
import { Field, FieldProps, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SIGN_IN_PATH } from 'routes'
import useRouter from 'use-react-router'
import { getFieldError, isFieldError, parseGraphQLErrors } from 'utils/formik'
import SignInSignUpLayout from './SignInSignUpLayout'

const initialValues = {
  email: '',
  password: '',
  verify: '',
}

type SignUpValues = typeof initialValues

const SignUp = () => {
  const { t } = useTranslation()
  const handleCreateAccount = useCreateAccountMutation()
  const { history } = useRouter()

  return (
    <SignInSignUpLayout
      formTitle="Sign up"
      form={({ TextField, SubmitButton, setLoading }) => (
        <Formik
          initialValues={initialValues}
          validationSchema={createAccountParams}
          onSubmit={(values, actions) => {
            setLoading(true)

            handleCreateAccount({ variables: values })
              .then(({ data }) => {
                history.push(SIGN_IN_PATH, {
                  email: data && data.createAccount.email,
                })
              })
              .catch((error) => {
                actions.setErrors(parseGraphQLErrors(error.graphQLErrors))
                setLoading(false)
              })
          }}
          validate={({ password, verify }) => {
            if (password && password !== verify) {
              return {
                verify: 'accounts:verify_password_not_match',
              }
            }
          }}
        >
          {(form) => (
            <>
              <Field name="email">
                {({ field }: FieldProps<SignUpValues>) => (
                  <TextField
                    autoFocus
                    label="Email"
                    name={field.name}
                    onChange={field.onChange}
                    value={field.value}
                    helperText={getFieldError(field.name, form, t)}
                    error={isFieldError(field.name, form)}
                  />
                )}
              </Field>
              <Field name="password">
                {({ field }: FieldProps<SignUpValues>) => (
                  <TextField
                    label="Password"
                    type="password"
                    name={field.name}
                    onChange={field.onChange}
                    value={field.value}
                    helperText={getFieldError(field.name, form, t)}
                    error={isFieldError(field.name, form)}
                  />
                )}
              </Field>
              <Field name="verify">
                {({ field }: FieldProps<SignUpValues>) => (
                  <TextField
                    label="Verify password"
                    type="password"
                    name={field.name}
                    onChange={field.onChange}
                    value={field.value}
                    helperText={getFieldError(field.name, form, t)}
                    error={isFieldError(field.name, form)}
                  />
                )}
              </Field>
              <SubmitButton onClick={form.submitForm}>Sign up</SubmitButton>
            </>
          )}
        </Formik>
      )}
      image={Collab}
      bottomText={
        <>
          <Typography variant="body2" display="inline" color="textSecondary">
            Already have account?
          </Typography>{' '}
          <Typography display="inline" color="textPrimary">
            <Link to="/auth/sign-in">Sign in</Link>
          </Typography>
        </>
      }
    />
  )
}

export default SignUp
