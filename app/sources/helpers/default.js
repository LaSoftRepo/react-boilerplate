
export default {
  noop: () => {},
  identity: value => value,
  comparator: (a, b) => a > b ? 1 : (a < b ? -1 : 0),
  momentComparator: (a, b) => a.diff(b),
};
