import fs from 'fs'
import path from 'path'

type GitRepoInfo = {
  sha: string
  abbreviatedSha: string
  branch: string
  tag: string
  committer: string
  committerDate: string
  author: string
  authorDate: string
  commitMessage: string
  root: string
  commonGitDir: string
  worktreeGitDir: string
  lastTag: string
  commitsSinceLastTag: string
  parents: string
  version: string
}

const gitRepoInfo = async (): Promise<GitRepoInfo> => {
  try {
    const info = await fs.readFileSync(path.resolve(__dirname, '../../repo-info.json'), 'utf-8')
    return JSON.parse(info)
  } catch (err) {
    console.error('Can not get repo info', err)
  }
}

export default gitRepoInfo
