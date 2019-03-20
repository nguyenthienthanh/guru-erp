import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import locales from '@guru-erp/locales'

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: locales,
    lng: 'vi',
    defaultNS: 'main',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18next