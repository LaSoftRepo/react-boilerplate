
import { goBack } from 'react-router-redux'

@connect()
export default class Users extends PureComponent {
  render() {
    const { dispatch } = this.props;
    return (
      <div layout='columns'>
        <button onClick={ () => dispatch(goBack()) }>Back</button>
        <h2>Github Users</h2>
      </div>
    );
  }
}
