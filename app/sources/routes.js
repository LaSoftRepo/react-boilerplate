import About       from 'containers/About'
// Containers
import Home        from 'containers/Home'
import Playground  from 'containers/Playground'
import Profile     from 'containers/Profile'
import Users       from 'containers/Users'

const Login = () => <h2>Login</h2>;

// eslint-disable-next-line no-unused-vars
export default (store) => [
  { path: '/',           component: Home, exact: true },
  { path: '/users',      component: Users },
  { path: '/login',      component: Login },
  { path: '/about',      component: About },
  { path: '/profile',    component: Profile },
  { path: '/playground', component: Playground },
];
