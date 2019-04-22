export const AUTH_PATH = `/auth`
export const SIGN_IN_PATH = `${AUTH_PATH}/sign-in`
export const SIGN_UP_PATH = `${AUTH_PATH}/sign-up`

export const CREATE_ORG_PATH = `/create-org`

export const WORK_PATH = `/work`

export const ORG_LIST_PATH = `${WORK_PATH}/organizations`

export const getOrgPath = (namespace: string) => `/work/${namespace}`
