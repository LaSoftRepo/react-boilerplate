import './styles.scss'

import Link from 'react-router-dom/Link'

export default class Home extends PureComponent {
  render() {
    return (
      <ul>
        <li><Link to='/users'>Users</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/playground'>Playground</Link></li>
      </ul>
    );
  }
}
