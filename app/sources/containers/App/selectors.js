
// eslint-disable-next-line
export const locationSelector = () => createSelector(
  ({ route }) => route,
  ({ location }) => location,
);
