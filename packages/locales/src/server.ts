import bodyParser = require('body-parser')
import cors from 'cors'
import express from 'express'
import fs from 'fs'
import lodash from 'lodash'
import path from 'path'
import builder from './builder'
import logger from './logger'

const app = express()
const PORT = 3002

const loadTranslation = (lng: string, ns: string) => {
  let translation

  try {
    translation = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, `../languages/${lng}/${ns}.missing.json`)).toString(),
    )
  } catch (e) {
    translation = {}
  }
  return translation
}

const saveTranslation = (translation: object, lng: string, ns: string) => {
  const transPath = path.resolve(__dirname, `../languages/${lng}`)
  if (!fs.existsSync(transPath)) {
    fs.mkdirSync(transPath)
  }

  fs.writeFileSync(
    path.resolve(__dirname, `../languages/${lng}/${ns}.missing.json`),
    JSON.stringify(translation),
  )
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/locales/add/:lng/:ns', (req, res) => {
  const { lng, ns }: { lng: string; ns: string } = req.params

  const keys = lodash.omit(req.body, '_t')

  const translation = loadTranslation(lng, ns)

  const nextTranslation = {
    ...translation,
    ...keys,
  }

  saveTranslation(nextTranslation, lng, ns)

  builder()

  res.send('ok')
})

app.listen(PORT, () => {
  logger.info(`i18next server is running on ${PORT}`)
})
