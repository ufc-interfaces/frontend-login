import setLocale, { DEFAULT_LOCALE } from './setLocale'

type InitParams = {
  locale?: ValidLocale
}

export default ({ locale = DEFAULT_LOCALE }: InitParams = {}) => {
  setLocale(locale)
}
