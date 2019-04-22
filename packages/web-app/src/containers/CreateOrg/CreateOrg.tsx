import React from 'react'

import { useCreateOrgMutation } from '@guru-erp/react-apollo'
import { createOrgParams } from '@guru-erp/validator'
import { Typography } from '@material-ui/core'
import { Field, FieldProps, Formik, FormikActions } from 'formik'
import Helmet from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { WORK_PATH } from 'routes'
import useRouter from 'use-react-router'
import { getFieldError, isFieldError, parseGraphQLErrors } from 'utils/formik'
import CreateOrgLayout from './components/CreateOrgLayout'

const initialValues = {
  name: '',
  namespace: '',
}

type FormValues = typeof initialValues

const CreateOrg = () => {
  const { t } = useTranslation()
  const formRef = React.useRef<Formik<FormValues>>(null)
  const handleCreateOrg = useCreateOrgMutation()
  const { history } = useRouter()

  return (
    <>
      <Helmet title={t('create_org')} />
      <CreateOrgLayout
        formTitle="Business info"
        formFields={({ TextField, setLoading }) => {
          const handleSubmitCreateOrg = (
            values: FormValues,
            actions: FormikActions<FormValues>,
          ) => {
            setLoading(true)

            return handleCreateOrg({ variables: values })
              .then(({ data }) => {
                history.push(WORK_PATH)
              })
              .catch((error) => {
                console.error(parseGraphQLErrors(error.graphQLErrors))
                actions.setErrors(parseGraphQLErrors(error.graphQLErrors))

                setLoading(false)
              })
          }

          return (
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmitCreateOrg}
              ref={formRef}
              validationSchema={createOrgParams}
            >
              {(form) => (
                <>
                  <Field name="name">
                    {({ field }: FieldProps<FormValues>) => (
                      <TextField
                        autoFocus
                        label="Business name"
                        name={field.name}
                        onChange={field.onChange}
                        value={field.value}
                        helperText={getFieldError(field.name, form, t)}
                        error={isFieldError(field.name, form)}
                      />
                    )}
                  </Field>
                  <Field name="namespace">
                    {({ field }: FieldProps<FormValues>) => (
                      <TextField
                        label="Business namespace"
                        name={field.name}
                        onChange={field.onChange}
                        value={field.value}
                        helperText={getFieldError(field.name, form, t)}
                        error={isFieldError(field.name, form)}
                      />
                    )}
                  </Field>
                  <Typography color="error">{getFieldError('$form', form, t)}</Typography>
                </>
              )}
            </Formik>
          )
        }}
        nextButton={(NextButton) => (
          <NextButton
            onClick={() => {
              if (formRef.current) formRef.current.submitForm()
            }}
          >
            Next
          </NextButton>
        )}
      />
    </>
  )
}

export default CreateOrg
