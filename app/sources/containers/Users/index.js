
import { goBack } from 'react-router-redux'
import { FetchAction } from './actions'
import { linkActions } from 'helpers/redux'

import Api from 'api'
import Default from 'helpers/default'

@connect(
  ({ users }) => ({ users }),
  linkActions({ fetch: FetchAction.request, goBack })
)
export default class Users extends PureComponent {
  static propTypes = {
    users: PropTypes.object,
  }

  static defaultProps = {
    fetchUsers: Default.noop,
    goBack:     Default.noop,
  }

  componentWillMount() {
    //this.props.fetch(Api.get.users);
    this.props.fetch(Api.users.get());
  }

  render() {
    const { users, goBack } = this.props;

    if (!users.error) {
      console.log('Github Users', users.data);
    } else {
      throw users.error;
    }

    return (
      <div layout='columns'>
        <button onClick={ () => goBack() }>Back</button>
        <h2>Github Users</h2>
      </div>
    );
  }
}
