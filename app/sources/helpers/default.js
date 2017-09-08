
export default {
  get noop() { return () => {} },
  get identity() { return value => value },
  get comparator() { return (a, b) => a > b ? 1 : (a < b ? -1 : 0) },
};
