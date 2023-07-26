import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en_US from 'locales/en_us.json';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      'en-US': {
        translation: en_US
      }
    }
  });

export default i18n;
