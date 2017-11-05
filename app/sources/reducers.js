/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux'
import { routerReducer }   from 'react-router-redux'
import app                 from 'containers/App/reducer'
import users               from 'containers/Users/reducer'
import language            from 'containers/LanguageProvider/reducer'

/**
 * Creates the global reducer with the asynchronously loaded ones
 */
export const rootReducer = asyncReducers => (
  combineReducers({
    app,
    users,
    language,
    router: routerReducer,
    ...asyncReducers,
  })
);

export const injectReducer = (store, { name, reducer }) => {
  if (Reflect.has(store.asyncReducers, name)) return;

  // eslint-disable-next-line no-param-reassign
  store.asyncReducers[name] = reducer;
  store.replaceReducer(rootReducer(store.asyncReducers));
};
