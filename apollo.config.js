module.exports = {
  client: {
    service: {
      name: 'guru-erp',
      localSchemaFile: './packages/server/src/services/gateway/generated-schema.gql',
    },
    includes: [
      'packages/server/src/**/__test__/**/*.{ts,gql,graphql}',
      'packages/web-app/src/**/*.{ts,gql,graphql}',
      'packages/desktop-app/src/**/*.{ts,gql,graphql}',
      'packages/react-apollo/src/**/*.{ts,gql,graphql}',
    ],
    excludes: ['node_modules/**/*'],
  },
}
