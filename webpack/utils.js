const SEPARATOR_REGEX  = /[-_]/;
const CAPITALIZE_REGEX = /(^|[^a-zA-Z\u00C0-\u017F'])([a-zA-Z\u00C0-\u017F])/g;

function prettifyPackageName(name) {
  if (!name || name === '') return null;
  return name
    .replace(SEPARATOR_REGEX, ' ')
    .replace(CAPITALIZE_REGEX, m => m.toUpperCase());
}

module.exports = {
  prettifyPackageName,
};
