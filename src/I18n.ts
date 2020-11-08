import i18n from 'i18n-js';

import en from './locales/en.json';
import ru from './locales/ru.json';

function localeCode() {
  return 'ru'; // fetch en from en_US
}

i18n.defaultLocale = 'ru';
i18n.locale = localeCode();
i18n.fallbacks = true;
i18n.translations = { en, ru };

export default i18n;
