/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux'
import { routerReducer }   from 'react-router-redux'
import appReducer          from 'containers/App/reducer'
import usersReducer        from 'containers/Users/reducer'
import languageReducer     from 'containers/LanguageProvider/reducer'

/**
 * Creates the global reducer with the asynchronously loaded ones
 */
export const rootReducer = asyncReducers => {
  return combineReducers({
    app:      appReducer,
    users:    usersReducer,
    router:   routerReducer,
    language: languageReducer,
    ...asyncReducers,
  });
};

export const injectReducer = (store, { name, reducer }) => {
  if (Reflect.has(store.asyncReducers, name)) return;

  store.asyncReducers[name] = reducer;
  store.replaceReducer(rootReducer(store.asyncReducers));
};
