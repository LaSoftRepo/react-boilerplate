import './styles.scss'

import { goBack } from 'react-router-redux'

@connect()
export default class Playground extends Component {
  state = {
    layout: 'rows',
  }

  handleChange = ({ currentTarget }) => {
    // eslint-disable-next-line
    this.setState({ layout: currentTarget.value });
  }

  render() {
    const { dispatch } = this.props;
    const { layout }   = this.state;

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
            <div className='demo-box' />
            <div className='demo-box' />
            <div className='demo-box' />
            <div className='demo-box' />
            <div className='demo-box' />
            <div className='demo-box' />
            <div className='demo-box' />
          </section>
        </div>
      </div>
    );
  }
}
