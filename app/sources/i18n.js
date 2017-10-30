import i18n     from 'i18next'
import Detector from 'i18next-browser-languagedetector'

i18n
.use(Detector)
.init({
  fallbackLng: 'en',
  debug:       true,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  // react i18next special options (optional)
  react: {
    wait:      false,
    bindI18n:  'languageChanged loaded',
    bindStore: 'added removed',
    nsMode:    'default',
  },

  // test hardcoded resorces
  resources: {
    en: {
      translation: {
        age:  { label: 'Age',  },
        home: { label: 'Home', },
        name: { label: 'Name', },
      },
    },

    es: {
      translation: {
        age:  { label: 'Años',   },
        home: { label: 'Casa',   },
        name: { label: 'Nombre', },
      },
    },
  },
});


export default i18n;
