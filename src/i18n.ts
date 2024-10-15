import { createI18n } from 'vue-i18n';
import frLocale from './locales/fr.json';
import enLocale from './locales/en.json';

export type MessageSchema = typeof frLocale;

const messages = {
  en: enLocale,
  fr: frLocale,
};

export const i18n = createI18n<[MessageSchema], 'en' | 'fr'>({
  legacy: false,
  globalInjection: true,
  locale: 'fr',
  fallbackLocale: 'en',
  messages,
});
