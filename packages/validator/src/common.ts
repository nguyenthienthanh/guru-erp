import * as Yup from 'yup'

export const email = Yup.string().email()
export const objectId = Yup.string().matches(/^[0-9a-fA-F]{24}$/)
