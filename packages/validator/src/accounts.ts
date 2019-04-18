import * as Yup from 'yup'
import { email, objectId } from './common'

export const PASSWORD_MIN_LENGTH = 6
export const PASSWORD_MAX_LENGTH = 128

export const accountId = objectId

export const accountEmail = email.email()
export const accountPassword = Yup.string()
  .min(PASSWORD_MIN_LENGTH)
  .max(PASSWORD_MAX_LENGTH)

export const createAccountParams = Yup.object().shape({
  email: accountEmail.required(),
  password: accountPassword.required(),
})

export const signInParams = Yup.object().shape({
  email: accountEmail.required(),
  password: accountPassword.required(),
})

export const findAccountByIdParams = Yup.object().shape({
  id: objectId.required(),
})
