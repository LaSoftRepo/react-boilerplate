
import { goBack }      from 'react-router-redux'
import { linkActions } from 'helpers/redux'
import Default         from 'helpers/default'
import { FetchAction } from './actions'
import { Github }      from 'api'

@connect(({ users }) => ({ users }), linkActions(FetchAction, { goBack }))
export default class Users extends PureComponent {
  static propTypes = {
    users: PropTypes.object,
  }

  static defaultProps = {
    fetchUsers: Default.noop,
    goBack:     Default.noop,
  }

  componentWillMount() {
    this.props.request(Github.users.get());
    //this.props.cancel();
  }

  render() {
    const { users, goBack } = this.props;

    if (!users.error) {
      console.log('Github Users', users.data);
    } else {
      console.log('Github Users Error', users.error.response);
    }

    return (
      <div layout='columns'>
        <button onClick={ goBack }>Back</button>
        <h2>Github Users</h2>
      </div>
    );
  }
}
