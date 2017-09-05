
import { goBack } from 'react-router-redux'
import { FetchUsersAction } from './actions'
import { bindActionCreators } from 'redux'

@connect(
  ({ users }) => ({ users }),
  dispatch => bindActionCreators({
    fetchUsers: FetchUsersAction.request,
  }, dispatch)
)
export default class Users extends PureComponent {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { dispatch, users } = this.props;

    console.log('Github Users', users.data);

    if (users.error) {
      //throw this.props.users.error;
    }

    return (
      <div layout='columns'>
        <button onClick={ () => dispatch(goBack()) }>Back</button>
        <h2>Github Users</h2>
      </div>
    );
  }
}
