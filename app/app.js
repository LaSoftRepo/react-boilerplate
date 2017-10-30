
// Polyfills
import 'babel-polyfill'
import 'es6-promise/auto'
import 'raf/polyfill'
import 'isomorphic-fetch'

// Styles
import 'styles/index.scss'

import { Provider } from 'react-redux'

// Routing
import Redirect from 'react-router-dom/Redirect'
import Route    from 'react-router-dom/Route'
import Switch   from 'react-router-dom/Switch'

import createBrowserHistory from 'history/createBrowserHistory'
import ConnectedRouter from 'react-router-redux/ConnectedRouter'

import { I18nextProvider } from 'react-i18next'

// Utils
import { hasReduxDevToolExtension } from 'sources/internal/utils'

// Cofigurations
import configureStore from './sources/store'

// Main containers
import App              from 'containers/App'
import DevTools         from 'containers/DevTools'
import NotFound         from 'containers/NotFound'
import LanguageProvider from 'containers/LanguageProvider'
import configureRoutes  from './sources/routes'
import i18n             from './sources/i18n'

const history = createBrowserHistory({
  //getUserConfirmation: ConfirmationRenderer
});

const containerNode = document.getElementById('app');

const initialState = {};
const store  = configureStore(initialState, history);
const routes = configureRoutes(store);

const render = () => {
  ReactDOM.render(
    <div>
      <Provider store={ store }>
        <I18nextProvider i18n={ i18n }>
          <ConnectedRouter history={ history }>
            <App hideHeader hideFooter>
              <Switch>
                <Redirect from='/index.html' to='/' />
                { routes.map(route => <Route key={ route.path } { ...route } />) }
                <Route component={ NotFound } />
              </Switch>
            </App>
          </ConnectedRouter>
        </I18nextProvider>
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
      render();
    } catch (e) {
      location.reload(true);
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
    .then(() => render())
    .catch(err => { throw err });
} else {
  console.log('intl supported');
  render();
}*/

render();

if (process.env.NODE_ENV !== 'production') {
  console.log('React v' + React.version);

  if (__USE_PERFORMANCE_TOOLS__) {
    // according this issue https://github.com/garbles/why-did-you-update/issues/45
    let createClass = React.createClass;
    Object.defineProperty(React, 'createClass', {
      set: nextCreateClass => { createClass = nextCreateClass }
    });
    // eslint-disable-next-line global-require
    const { whyDidYouUpdate } = require('why-did-you-update');
    whyDidYouUpdate(React, { exclude: /^(DevTools|DockMonitor|Route|Router)$/ });
  }
}

// Install ServiceWorker and AppCache
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
