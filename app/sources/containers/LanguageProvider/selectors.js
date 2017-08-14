/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = ({ language }) => language;

/**
 * Select the language locale
 */
export const localeSelector = () => createSelector(
  selectLanguage,
  ({ locale }) => locale,
);
