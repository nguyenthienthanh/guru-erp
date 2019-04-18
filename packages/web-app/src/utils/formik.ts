import { get, isEmpty } from 'lodash'

import { FormikProps } from 'formik'
import i18next from 'i18next'

export const parseGraphQLErrors = (graphQLErrors: any) => {
  const errors: any = {}

  graphQLErrors.forEach((error: any) => {
    const exception = get(error, 'extensions.exception')
    const path = get(exception, 'data.path', '$form')
    const type = get(exception, 'type', 'unknown_error')

    errors[path] = type
  })

  return isEmpty(errors) ? { $form: 'unknown_error' } : errors
}

export const getFieldError = (fieldName: string, form: FormikProps<any>, t?: i18next.TFunction) =>
  (fieldName === '$form' ? true : form.touched[fieldName]) &&
  (t ? t(form.errors[fieldName] as string) : form.errors[fieldName])
export const isFieldError = (fieldName: string, form: FormikProps<any>, t?: i18next.TFunction) =>
  !!getFieldError(fieldName, form, t)
