import { goBack } from 'react-router-redux';

@connect()
export default class About extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div layout='columns'>
        <button onClick={ () => dispatch(goBack()) }>Back</button>
        <h2>React Boilerplate</h2>
      </div>
    );
  }
}
