export const getServiceEnv = (envKey: string, serviceName = '') => {
  return process.env[`${envKey}__${serviceName}`] || process.env[envKey]
}
