
// Containers
import Home        from 'containers/Home'
import About       from 'containers/About'
import Users       from 'containers/Users'
import Profile     from 'containers/Profile'
import Playground  from 'containers/Playground'

import Modal from 'components/Modal'

import { goBack } from 'react-router-redux'

const Login = () => <h2>Login</h2>;

export default (store) => [
  { path: '/',           component: Home, exact: true },
  { path: '/users',      component: Users },
  { path: '/login',      component: Login },
  { path: '/about',      component: About },
  { path: '/profile',    component: Profile },
  { path: '/playground', component: Playground },
  { path: '/dialog',     render: () => <Modal onClose={ () => store.dispatch(goBack()) }/> },
];
