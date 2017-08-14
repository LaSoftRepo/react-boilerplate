
import Route from 'react-router-dom/Route';

// Containers
import Home        from './containers/Home';
import About       from './containers/About';
import Playground  from './containers/Playground';

import Modal from './components/Modal';

import { goBack } from 'react-router-redux';

const LoginPage = () => <h2>Login</h2>;

export default (store) => [
  { path: '/',           component: Home, exact: true },
  { path: '/login',      component: LoginPage },
  { path: '/about',      component: About },
  { path: '/playground', component: Playground },
  { path: '/dialog',     render: () => <Modal onClose={ () => store.dispatch(goBack()) }/> },
];
