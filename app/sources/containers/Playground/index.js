import { connect } from 'react-redux';
import { goBack }  from 'react-router-redux';

import './index.scss';

@connect()
export default class Playground extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: 'rows',
    };
  }

  handleChange = event => {
    this.setState({ layout: event.currentTarget.value });
  }

  render() {
    const { dispatch } = this.props;
    const { layout } = this.state;
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
