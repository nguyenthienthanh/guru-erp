import fs from 'fs'
import path from 'path'

import logger from './logger'

const builder = () => {
  const languagesDirPath = path.resolve(__dirname, '../languages')

  const languages = fs.readdirSync(languagesDirPath)

  logger.info('Detected languages', languages)

  const locales: any = {}

  languages.forEach((lng) => {
    locales[lng] = {}

    const lngDirPath = path.resolve(languagesDirPath, lng)
    const namespaces = fs
      .readdirSync(lngDirPath)
      .map((ns) => ns.replace(/\.json$/, '').replace(/\.missing/, ''))

    logger.info(`[lng] Detected namespaces`, namespaces)

    namespaces.forEach((ns) => {
      locales[lng][ns] = {}

      try {
        const transPath = path.resolve(lngDirPath, `${ns}.json`)
        const translations = fs.existsSync(transPath)
          ? JSON.parse(fs.readFileSync(transPath).toString())
          : {}

        const missingTransPath = path.resolve(lngDirPath, `${ns}.missing.json`)
        const missingTranslations = fs.existsSync(missingTransPath)
          ? JSON.parse(fs.readFileSync(missingTransPath).toString())
          : {}

        locales[lng][ns] = { ...translations, ...missingTranslations }
      } catch (e) {
        // ignore
      }
    })
  })

  logger.info(`Generated locales\n`, locales)

  fs.writeFileSync(path.resolve(__dirname, '../locales.json'), JSON.stringify(locales))

  logger.info(`Exported locales to locales.json`)
}

export default builder

builder()
