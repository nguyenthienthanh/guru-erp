import fs from 'fs'
import path from 'path'

const builder = () => {
  const languagesDirPath = path.resolve(__dirname, '../languages')

  const languages = fs.readdirSync(languagesDirPath)

  console.log('Detected languages', languages)

  const locales: any = {}

  languages.forEach((lng) => {
    locales[lng] = {}

    const lngDirPath = path.resolve(languagesDirPath, lng)
    const namespaces = fs
      .readdirSync(lngDirPath)
      .map((ns) => ns.replace(/\.json$/, '').replace(/\.missing/, ''))

    console.log(`[lng] Detected namespaces`, namespaces)

    namespaces.forEach((ns) => {
      locales[lng][ns] = {}

      try {
        const translations = fs.existsSync(path.resolve(lngDirPath, `${ns}.json`))
          ? JSON.parse(fs.readFileSync(path.resolve(lngDirPath, `${ns}.json`)).toString())
          : {}

        const missingTranslations = fs.existsSync(path.resolve(lngDirPath, `${ns}.missing.json`))
          ? JSON.parse(fs.readFileSync(path.resolve(lngDirPath, `${ns}.missing.json`)).toString())
          : {}

        locales[lng][ns] = { ...translations, ...missingTranslations }
      } catch (e) {
        // ignore
      }
    })
  })

  console.log(`Generated locales\n`, locales)

  fs.writeFileSync(path.resolve(__dirname, '../locales.json'), JSON.stringify(locales))

  console.log(`Exported locales to locales.json`)
}

export default builder

builder()
