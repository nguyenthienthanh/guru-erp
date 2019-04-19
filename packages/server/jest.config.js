const dotenv = require('dotenv')

function dotenvConfig() {
  const ENV = process.env.NODE_ENV

  dotenv.config({ path: `.env.${ENV}.local` })
  dotenv.config({ path: `.env.${ENV}` })

  dotenv.config({ path: '.env.local' })
  dotenv.config({ path: '.env' })
}

dotenvConfig()

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>/src'],
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/lib/', 'config.ts'],
  reporters: ['default'],
}
