import i18next from 'i18next'
import i18nextXhrBackend from 'i18next-xhr-backend'
import { initReactI18next } from 'react-i18next'

import locales from '@guru-erp/locales'

const I18NEXT_SERVER = process.env.REACT_APP_I18NEXT_SERVER || 'http://localhost:3002'

i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(i18nextXhrBackend)
  .init({
    resources: locales,
    lng: 'en',
    // fallbackLng: 'vi',
    defaultNS: 'main',

    saveMissing: true, // send not translated keys to endpoint

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    backend: {
      loadPath: `${I18NEXT_SERVER}/locales/resources.json?lng={{lng}}&ns={{ns}}`,

      // path to post missing resources
      addPath: `${I18NEXT_SERVER}/locales/add/{{lng}}/{{ns}}`,
      allowMultiLoading: !false,
    },
  })

export default i18next
