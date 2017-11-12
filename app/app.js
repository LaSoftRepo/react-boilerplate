
// Polyfills
import 'es6-promise/auto'
import 'isomorphic-fetch'
import 'raf/polyfill'

// Styles
import 'styles/index.scss'

import { Provider } from 'react-redux'

// Routing
import Redirect from 'react-router-dom/Redirect'
import Route    from 'react-router-dom/Route'
import Switch   from 'react-router-dom/Switch'

import createBrowserHistory from 'history/createBrowserHistory'
import ConnectedRouter      from 'react-router-redux/ConnectedRouter'

// Utils
import { hasReduxDevToolExtension } from 'sources/internal/utils'
import ErrorBoundary from 'components/internal/ErrorBoundary'

// Cofigurations
import configureStore   from './sources/store'

// Main containers
import App              from 'containers/App'
import DevTools         from 'containers/DevTools'
import NotFound         from 'containers/NotFound'
import LanguageProvider from 'containers/LanguageProvider'
import configureRoutes  from './sources/routes'

// import ConfirmationRenderer from './sources/components/ConfirmationRenderer';

import { translations } from './sources/i18n'

const history = createBrowserHistory({
  // getUserConfirmation: ConfirmationRenderer
});

const containerNode = document.getElementById('app');

const initialState = {};
const store  = configureStore(initialState, history);
const routes = configureRoutes(store);

const render = translations => { // eslint-disable-line
  ReactDOM.render(
    <div>
      <Provider store={ store }>
        <LanguageProvider messages={ translations }>
          <ConnectedRouter history={ history }>
            <App hideHeader hideFooter>
              <ErrorBoundary>
                <Switch>
                  <Redirect from='/index.html' to='/' />
                  { routes.map(route => <Route key={ route.path } { ...route } />) }
                  <Route component={ NotFound } />
                </Switch>
              </ErrorBoundary>
            </App>
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>
      { process.env.NODE_ENV === 'development' && !hasReduxDevToolExtension ? <DevTools store={ store } /> : null }
    </div>,
    containerNode
  );
};


// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept([
    './sources/containers/App',
    './sources/reducers',
    './sources/routes',
    './sources/i18n',
  ], () => {
    ReactDOM.unmountComponentAtNode(containerNode);
    try {
      render(translations);
    } catch (e) {
      window.location.reload(true);
    }
  });
}

/*
if (!window.Intl) {
  console.log('intl not supported');
  // We should wrap import to Promise for make HMR work in current page
  (new Promise(resolve => { resolve(import('intl')) }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
      import('intl/locale-data/jsonp/ru.js'),
    ]))
    .then(() => render(translations))
    .catch(err => { throw err });
} else {
  console.log('intl supported');
  render(translations);
} */

render(translations);

// eslint-disable-next-line no-console
console.info(`React v${ React.version }`);

if (process.env.NODE_ENV !== 'development') {
  // Install ServiceWorker and AppCache
  // eslint-disable-next-line global-require
  require('offline-plugin/runtime').install();
}
