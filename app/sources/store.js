/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { persistState } from 'redux-devtools';
import createReducer from './reducers';
import rootSaga from './sagas';
import DevTools from 'containers/DevTools';
import { hasReduxDevToolExtension } from './internal/utils';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState, history) {

  // Create the store with two common middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  // Add some debug middlewares
  if (process.env.NODE_ENV !== "production") {
    const loggerMiddleware = createLogger({
      level:    "info",
      collapsed: true,
      logErrors: true,
      duration:  true,
      colors: {
        title:     () => "#3366ff",
        prevState: () => "#75b8d4",
        nextState: () => "#f6921e",
        action:    () => "#60bd16",
        error:     () => "#aa0000",
      },
    });

    middlewares.unshift(
      loggerMiddleware,
      require("redux-immutable-state-invariant").default(),
    );
  }

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  if (process.env.NODE_ENV !== "production") {
    enhancers.push(
      hasReduxDevToolExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : DevTools.instrument(),
      persistState(
        window.location.href.match(/[?&]debug_session=([^&#]+)\b/)
      )
    );
  }

  const store = createStore(
    createReducer(),
    initialState,
    compose(...enhancers),
  );

  // Extensions
  //store.runSaga = sagaMiddleware.run;
  //store.asyncReducers = {};

  let sagaTask = sagaMiddleware.run(rootSaga);

  // Make sagas hot reloadable
  if (module.hot) {
    module.hot.accept('./sagas', () => {
      const newRootSaga = require('./sagas');
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(newRootSaga)
      })
    });

    // Make reducers hot reloadable
    module.hot.accept('./reducers', () => {
      //store.replaceReducer(createReducer(store.injectedReducers));
      const nextReducers = require('./reducers');
      store.replaceReducer(nextReducers());
    });
  }

  return store;
}
