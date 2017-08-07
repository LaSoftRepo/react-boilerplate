import { createSelector } from 'reselect';

/**
 * Direct selector to the languageToggle state domain
 */
export const selectLanguage = state => state.language;

/**
 * Select the language locale
 */
export const localeSelector = () => createSelector(
  selectLanguage,
  languageState => languageState.locale,
);
