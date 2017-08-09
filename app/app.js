
// Polyfills
import 'babel-polyfill';

// React
import React from 'react';
import ReactDOM from 'react-dom';

import 'sources/internal/experimental/inject-custom-properties.js';

import './styles/main.scss';

// Redux
import { Provider } from 'react-redux';

// Routing
import Route    from 'react-router-dom/Route';
import Switch   from 'react-router-dom/Switch';
import Link     from 'react-router-dom/Link';

import createBrowserHistory from 'history/createBrowserHistory';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import { goBack } from 'react-router-redux';

// Cofigurations
import configureStore from './sources/store';

// Main containers
import App              from './sources/containers/App';
import DevTools         from './sources/containers/DevTools';
import NotFound         from './sources/containers/NotFound';
import LanguageProvider from './sources/containers/LanguageProvider';

import { translations } from './sources/i18n';

import redirect from './sources/enhancers/redirect';

const history = createBrowserHistory();

const initialState = {};
const store = configureStore(initialState, history);

const HomePage = () => (
  <ul>
    <li><Link to='/about'>About</Link></li>
    <li><Link to='/company'>Company</Link></li>
    <li><Link to='/playground'>Playground</Link></li>
  </ul>
);

const Playground = () => (
  <span grid reverse horizontally-distributed="between" vertically-aligned='center'>
    <div className='test-1'></div>
    <div className='test'></div>
    <div className='test-2'></div>
    <div className='test'></div>
  </span>
);

@redirect(() => false, '/login')
class AboutPage extends React.Component {
  render() {
    //return <h2>About<button onClick={ () => store.dispatch(goBack()) }>Back</button></h2>
    return (
      <div grid='columns'>
        <button onClick={ () => store.dispatch(goBack()) }>Back</button>
        <h2>About</h2>
      </div>
    );
  }
}

const CompanyPage = () => (
  <div>
    <button onClick={ () => store.dispatch(goBack()) }>Back</button>
    <ul>
      <li><h3>Company 1</h3></li>
      <li><h3>Company 2</h3></li>
    </ul>
  </div>
);

const LoginPage = () => <h2>Login</h2>;

const render = translations => {
  ReactDOM.render(
    <div>
      <Provider store={ store }>
        <LanguageProvider messages={ translations }>
          <ConnectedRouter history={ history }>
            <App hideHeader hideFooter>
              <Switch>
                <Route exact path='/'     component={ HomePage } />
                <Route path='/login'      component={ LoginPage } />
                <Route path='/index'      component={ HomePage } />
                <Route path='/about'      component={ AboutPage } />
                <Route path='/company'    component={ CompanyPage } />
                <Route path='/playground' component={ Playground } />
                <Route component={ NotFound } />
              </Switch>
            </App>
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>
      { process.env.NODE_ENV !== 'production' ? <DevTools store={ store } /> : null }
    </div>,
    document.getElementById('app')
  );
};


// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./sources/i18n', () => {
    render(translations);
  });
}


if (!window.Intl) {
  // We should wrap import to Promise for make HMR work
  (new Promise(resolve => { resolve(import('intl')) }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
      import('intl/locale-data/jsonp/ru.js'),
    ]))
    .then(() => render(translations))
    .catch(err => { throw err });
} else {
  render(translations);
}

if (process.env.NODE_ENV !== 'production') {
  // according this issue https://github.com/garbles/why-did-you-update/issues/45
  let createClass = React.createClass;
  Object.defineProperty(React, 'createClass', {
    set: nextCreateClass => { createClass = nextCreateClass }
  });
  // eslint-disable-next-line global-require
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React, { exclude: [ /^DevTools/, /^DockMonitor/, /^Route/, /^Router/ ] });
}
