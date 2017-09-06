
import { goBack } from 'react-router-redux'
import { FetchUsersAction } from './actions'
import { bindActionCreators } from 'redux'

@connect(
  ({ users }) => ({ users }),
  dispatch => bindActionCreators({
    fetchUsers: FetchUsersAction.request,
    goBack,
  }, dispatch)
)
export default class Users extends PureComponent {
  static propTypes = {
    users:      PropTypes.object,
    fetchUsers: PropTypes.func,
    goBack:     PropTypes.func,
  }

  static defaultProps = {
    users: {
      data:  null,
      error: null
    },
    fetchUsers: () => {},
    goBack:     () => {},
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { users, goBack } = this.props;

    console.log('Github Users', users.data);

    if (users.error) {
      //throw this.props.users.error;
    }

    return (
      <div layout='columns'>
        <button onClick={ () => goBack() }>Back</button>
        <h2>Github Users</h2>
      </div>
    );
  }
}
