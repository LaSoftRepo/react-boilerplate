/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import appReducer from './containers/App/reducer';
import languageReducer from './containers/LanguageProvider/reducer';
import { RESET } from './constants';

const initialState = {

};

function rootReducer(state = initialState, action = {}) {
  switch (action.type) {

    case RESET:
      return initialState;

    default:
      return state;
  }
}

/**
 * Creates the global reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    root:     rootReducer,
    app:      appReducer,
    router:   routerReducer,
    language: languageReducer,
    ...asyncReducers,
  });
}
