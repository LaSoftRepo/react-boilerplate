import { goBack } from 'react-router-redux'
import Select     from 'components/forms/Select'

import { filter } from 'fuzzaldrin-plus'

import './styles.scss'

// @connect()
export default class Playground extends Component {
  static defaultProps = {
    simpleData: [ 'Apple', 'Google', 'Lenovo', 'Dell', 'HP', 'Gorilla Glass', 'Air BnB', 'Luke Skywalker' ],
  }

  state = {
    layout: 'rows',
  }

  handleChange = ({ currentTarget }) => {
    this.setState({ layout: currentTarget.value });
  }

  render() {
    const { dispatch, simpleData } = this.props;
    const layout = this.state.layout;
    return (
      <div>
        {/* <button onClick={ () => dispatch(goBack()) }>Back</button>
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
        </div> */}

        <div layout='column' horizontal-align='center' style={{ marginTop: 40 }}>
          <Select
            label='Simple select'
            options={ simpleData }
          />

          <Select
            autoFocus
            required
            label='Select with filter'
            filter={ (options, value) => value ? filter(options, value) : options }
            options={ simpleData }
          />
        </div>
      </div>
    );
  }
}
