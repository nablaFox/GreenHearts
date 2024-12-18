import { getLocales } from 'expo-localization'
import { i18n } from '@lingui/core'

import '@formatjs/intl-locale/polyfill-force'

import '@formatjs/intl-pluralrules/polyfill-force'
import '@formatjs/intl-pluralrules/locale-data/en'

import { messages as enMessages } from './locales/en/messages.po'
import { messages as itMessages } from './locales/it/messages.po'

type SupportedLocales = 'en' | 'it'

const locales: Record<SupportedLocales, any> = {
  en: enMessages,
  it: itMessages
}

export async function setLocale(locale: SupportedLocales) {
  i18n.load(locale, locales[locale])
  i18n.activate(locale)
}

export function initI18n() {
  const locale = getLocales()[0].languageCode as SupportedLocales

  i18n.loadAndActivate({
    locale,
    messages: locales[locale]
  })
}

export { i18n }
