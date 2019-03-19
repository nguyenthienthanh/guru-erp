// CSpell:ignore prettierrc
const path = require('path')
const fs = require('fs')

let prettierConfig = {}

try {
  prettierConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../.prettierrc')))
} catch (e) {}

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    include: path.resolve(__dirname, '../src'),
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('babel-preset-react-app')],
        },
      },
      require.resolve('react-docgen-typescript-loader'),
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: {
          prettierConfig,
          parser: 'typescript',
        },
      },
    ],
  })

  config.resolve.extensions.push('.ts', '.tsx')

  return config
}
