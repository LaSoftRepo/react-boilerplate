
export default {
  get noop() { return () => {} },
  get identity() { return value => value },
  // eslint-disable-next-line no-nested-ternary
  get comparator() { return (a, b) => a > b ? 1 : (a < b ? -1 : 0) },
  get momentComparator() { return (a, b) => a.diff(b) }
};
