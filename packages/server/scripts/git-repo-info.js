const gitRepoInfo = require('git-repo-info')
const fs = require('fs')
const path = require('path')

const info = gitRepoInfo()
const version = require('../package.json').version

fs.writeFile(
  path.resolve(__dirname, '../repo-info.json'),
  JSON.stringify({ ...info, version, sha: info.sha || process.env.SOURCE_VERSION }),
  (err, info) => {
    if (err) {
      throw err
    }

    console.info('Git repo info file is created.')
  },
)
