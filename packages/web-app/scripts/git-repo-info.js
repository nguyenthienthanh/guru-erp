const fs = require('fs')
const path = require('path')
const gitRepoInfo = require('git-repo-info')

const info = gitRepoInfo()
const version = require('../package.json').version

const includeKeys = ['sha', 'version']

const parsedInfo = { ...info, version, sha: info.sha || process.env.SOURCE_VERSION }
const parsedENV = Object.keys(parsedInfo)
  .filter((key) => includeKeys.includes(key))
  .reduce((result, key) => {
    result += `REACT_APP_${key.toUpperCase()}=${parsedInfo[key]}\n`
    return result
  }, '')

fs.writeFile(path.resolve(__dirname, '../.env.local'), parsedENV, (err) => {
  if (err) {
    throw err
  }

  console.info('Git repo info file is created.')
})
