import t from 'format-message'
// import generate from 'format-message-generate-id'
//
// t.setup({ generateId: generate.underscored_crc32 })

type StringRecord<V = string> = Record<string, V>

const loadedTranslations: StringRecord<StringRecord<ValidLocale>> = {}

const getNormalizedLocale = (locale: ValidLocale) => {
  const map: StringRecord<ValidLocale> = {
    en: 'en-US',
  }

  return map[locale] || locale
}

const loadTranslations = (locale: ValidLocale) => {
  if (loadedTranslations[locale]) {
    return Promise.resolve(loadedTranslations[locale])
  }

  return import(`../translations/${locale}.json`)
    .then((module) => {
      loadedTranslations[locale] = module.default
      return loadedTranslations[locale]
    })
    .catch(() => {
      console.warn(
        `[login loadTranslations] Failed to get the ${locale} locale.`
      )
      return {}
    })
}

const setLocale = (_locale: ValidLocale) => {
  const locale = getNormalizedLocale(_locale)

  return loadTranslations(locale).then((translations) => {
    console.log('translations', translations)
    t.setup({
      locale,
      translations: {
        [locale]: translations,
      },
    })
  })
}

export const DEFAULT_LOCALE: ValidLocale = 'en'

export default setLocale
