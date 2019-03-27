import { mapKeys, pickBy } from 'lodash'

import { ServiceName } from 'local-types'

/**
 * Gets service env environment with format `SERVICE_NAME__ENV_KEY`.
 * @example
 *
 * getServiceEnv('accounts', 'MONGO_URI')
 * => Will look for process.env.ACCOUNTS__MONGO_URI, fallback to process.env.MONGO_URI
 */
type GetServiceEnvOverload = {
  (serviceName: ServiceName): {
    [key: string]: string
  }
  <Keys extends string[]>(serviceName: ServiceName): { [key in Keys[number]]: string }
  <Keys extends string[]>(serviceName: ServiceName, key: Keys[number]): string
  (serviceName: ServiceName, key: string): string
}
export const getServiceEnv: GetServiceEnvOverload = (serviceName: ServiceName, envKey?: string) => {
  const envKeyPrefix = `${serviceName.toUpperCase()}__`

  if (envKey) return process.env[`${envKeyPrefix}${envKey}`.toUpperCase()] || process.env[envKey]

  const serviceEnv = pickBy(process.env, (value, key) => key.startsWith(envKeyPrefix))

  return mapKeys(serviceEnv, (value, envKey) =>
    envKey.replace(new RegExp(`^${envKeyPrefix}`), ''),
  ) as any
}
