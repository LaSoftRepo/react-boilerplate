/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { routerReducer }   from 'react-router-redux';
import appReducer          from 'containers/App/reducer';
import languageReducer     from 'containers/LanguageProvider/reducer';

/**
 * Creates the global reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    app:      appReducer,
    router:   routerReducer,
    language: languageReducer,
    ...asyncReducers,
  });
}
