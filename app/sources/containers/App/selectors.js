import { createSelector } from 'reselect';

export const locationSelector = () => createSelector(
  ({ route }) => route,
  ({ location }) => location,
);
