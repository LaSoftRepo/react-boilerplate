
import { CHANGE_LOCALE } from './constants'

// eslint-disable-next-line
export function changeLocale(locale) {
  return {
    type: CHANGE_LOCALE,
    locale,
  };
}
