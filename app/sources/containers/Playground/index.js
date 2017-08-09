import React from 'react';

class Playground extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: 'rows',
    };
  }

  handleChange = event => {
    console.log(event.currentTarget.value);
    this.setState({ selectValue: event.currentTarget.value });
  }

  render() {
    const { selectValue } = this.state;
    return (
      <div grid='rows' horizontally-aligned='center' >
        <select size="2" value={ selectValue } onChange={ this.handleChange }>
            <option value="rows">rows</option>
            <option value="columns">columns</option>
        </select>
        <span grid={ selectValue } reverse horizontally-distributed="between" vertically-aligned='center'>
          <div className='test-1'></div>
          <div className='test'></div>
          <div className='test-2'></div>
          <div className='test'></div>
        </span>
      </div>
    );
  }
};

export default Playground;
