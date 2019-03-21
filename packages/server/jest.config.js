require('./src/utils/dotenv')()

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>/src'],
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/lib/', 'config.ts'],
  reporters: ['default'],
}
