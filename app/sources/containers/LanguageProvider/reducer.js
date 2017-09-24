import {
  DEFAULT_LOCALE,
  CHANGE_LOCALE,
}  from './constants'

const initialState = {
  locale: DEFAULT_LOCALE,
};

export default function language(state = initialState, { type, locale } = {}) {
  switch (type) {
    case CHANGE_LOCALE:
      return { ...state, locale };

    default:
      return state;
  }
}
