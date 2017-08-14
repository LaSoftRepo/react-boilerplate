export const locationSelector = () => createSelector(
  ({ route }) => route,
  ({ location }) => location,
);
