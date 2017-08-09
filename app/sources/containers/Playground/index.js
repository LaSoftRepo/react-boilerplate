import React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

@connect()
export default class Playground extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 'rows',
    };
  }

  handleChange = event => {
    this.setState({ selectedValue: event.currentTarget.value });
  }

  render() {
    const { dispatch }      = this.props;
    const { selectedValue } = this.state;
    return (
      <div>
        <button onClick={ () => dispatch(goBack()) }>Back</button>
        <div grid='rows' horizontally-aligned='center'>
          <select size='3' value={ selectedValue } onChange={ this.handleChange }>
              <option value='rows'>rows</option>
              <option value='columns'>columns</option>
              <option value='masonry'>masonry</option>
          </select>
          <section grid={ selectedValue } vertically-aligned="center">
            <div className='demo_box'></div>
            <div className='demo_box'></div>
            <div className='demo_box'></div>
            <div className='demo_box'></div>
          </section>
        </div>
      </div>
    );
  }
}
