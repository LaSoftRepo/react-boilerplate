import { addLocaleData } from 'react-intl';

import enLocaleData from 'react-intl/locale-data/en';
import ruLocaleData from 'react-intl/locale-data/ru';

import { DEFAULT_LOCALE } from 'containers/LanguageProvider/constants';

import en from 'translations/en.json';
import ru from 'translations/ru.json';

addLocaleData(enLocaleData);
addLocaleData(ruLocaleData);

export const appLocales = [
  'en',
  'ru',
];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE ?
    formatTranslationMessages(DEFAULT_LOCALE, en) : {};

  return Object.keys(messages).reduce((formattedMessages, key) => {
    const message = messages[key];
    const formattedMessage = !message && locale !== DEFAULT_LOCALE ? defaultFormattedMessages[key] : message;

    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export const translations = {
  en: formatTranslationMessages('en', en),
  ru: formatTranslationMessages('ru', ru),
};
