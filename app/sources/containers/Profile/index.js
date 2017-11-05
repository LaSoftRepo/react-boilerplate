import redirect from '../../enhancers/redirect';
import { Prompt } from 'react-router';
import { goBack } from 'react-router-redux';

@redirect(() => true, '/login')
export default class Profile extends Component {
  render() {
    const { dispatch } = this.props;
    // console.log('come from:', this.props.history.location.state.from);
    return (
      <div layout='columns'>
        <button onClick={ () => dispatch(goBack()) }>Back</button>
        <h2>-- User Profile Data --</h2>
        <Prompt message="Move away?" when />
      </div>
    );
  }
}
