import { goBack } from 'react-router-redux'

import './index.scss'

@connect()
export default class About extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div layout='columns'>
        <button onClick={ () => dispatch(goBack()) }>Back</button>
        <h2>React Boilerplate</h2>
        <div className='menu-icon'></div>
      </div>
    );
  }
}
