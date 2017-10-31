import { goBack } from 'react-router-redux';

import './styles.scss';

@connect()
export default class Playground extends Component {
  state = {
    layout: 'rows',
  }

  handleChange = ({ currentTarget }) => {
    this.setState({ layout: currentTarget.value });
  }

  render() {
    const { dispatch } = this.props;
    const layout = this.state.layout;

    return (
      <div>
        <button onClick={ () => dispatch(goBack()) }>Back</button>
        <div layout='rows' horizontal-align='center'>

          <select size='3' value={ layout } onChange={ this.handleChange }>
            <option value='rows'>rows</option>
            <option value='columns'>columns</option>
            <option value='masonry'>masonry</option>
          </select>

          <section layout={ layout } vertical-align='center' className='section-playground'>
            <div className='demo-box'></div>
            <div className='demo-box'></div>
            <div className='demo-box'></div>
            <div className='demo-box'></div>
            <div className='demo-box'></div>
            <div className='demo-box'></div>
            <div className='demo-box'></div>
          </section>
        </div>
      </div>
    );
  }
}
