import i18n from 'i18n-js';
import axios from 'axios';

import en from './locales/en.json';
import ru from './locales/ru.json';

const availableLang = ['en', 'ru']
i18n.defaultLocale = 'ru';
i18n.fallbacks = true;
i18n.translations = { en, ru };
changeLang(localeCode());

function setLangHeader(lang: string) {
  axios.defaults.headers.common['Accept-Language'] = lang;
}

export function localeCode() {
  return window.localStorage.getItem('i18nextLng') || i18n.defaultLocale;
}

export function changeLang(lang: string) {
  if (availableLang.includes(lang)) {
    window.localStorage.setItem('i18nextLng', lang);
    document.documentElement.lang = lang;
    setLangHeader(lang);
    i18n.locale = lang;
  }

  return i18n.locale;
}

export default i18n;
