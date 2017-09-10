
// Polyfills
import 'babel-polyfill'
import 'es6-promise/auto'
import 'isomorphic-fetch'
import 'sources/internal/experimental/inject-custom-properties.js'

// Styles
import 'styles/index.scss'

import { Provider } from 'react-redux'

// Routing
import Redirect from 'react-router-dom/Redirect'
import Route    from 'react-router-dom/Route'
import Switch   from 'react-router-dom/Switch'

import createBrowserHistory from 'history/createBrowserHistory'
import ConnectedRouter from 'react-router-redux/ConnectedRouter'

// Utils
import { hasReduxDevToolExtension } from 'sources/internal/utils'

// Cofigurations
import configureStore from './sources/store'

// Main containers
import App              from 'containers/App'
import DevTools         from 'containers/DevTools'
import NotFound         from 'containers/NotFound'
import LanguageProvider from 'containers/LanguageProvider'

import routes from './sources/routes'

//import ConfirmationRenderer from './sources/components/ConfirmationRenderer';

import { translations } from './sources/i18n'

const history = createBrowserHistory({
  //getUserConfirmation: ConfirmationRenderer
});

const containerNode = document.getElementById('app');

const initialState = {};
const store = configureStore(initialState, history);

const render = translations => {
  ReactDOM.render(
    <div>
      <Provider store={ store }>
        <LanguageProvider messages={ translations }>
          <ConnectedRouter history={ history }>
            <App hideHeader hideFooter>
              <Switch>

                <Redirect from='/index.html' to='/' />
                {
                  routes(store).map(({ path, exact, component, render }) =>
                    <Route key={ path } path={ path } exact={ exact } component={ component } render={ render } />
                  )
                }
                <Route component={ NotFound } />

              </Switch>
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
    .then(() => render(translations))
    .catch(err => { throw err });
} else {
  console.log('intl supported');
  render(translations);
}*/

render(translations);

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
