import redirect from '../../enhancers/redirect';
import { Prompt } from 'react-router';
import { goBack } from 'react-router-redux';

@redirect(() => true, '/login')
export default class AboutPage extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div layout='columns'>
        <button onClick={ () => dispatch(goBack()) }>Back</button>
        <h2>About</h2>
        <Prompt message="Move away?" when={ true } />
      </div>
    );
  }
}
