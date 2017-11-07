/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = ({ language }) => language;

/**
 * Select the language locale
 */
// eslint-disable-next-line
export const localeSelector = () => createSelector(
  selectLanguage,
  ({ locale }) => locale
);
