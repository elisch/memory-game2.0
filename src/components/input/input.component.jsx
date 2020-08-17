import React from 'react';

import './input.styles.scss';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 0,
    }
  }

  handleChange = event => {
    const inputValue = event.target.value;
    this.setState({ inputValue });
  }

  handleSubmit = event => {
    const { inputValue } = this.state;

    event.preventDefault();

    if(inputValue >= 2 && inputValue <= 50) {
      this.props.startGame(parseInt(inputValue));
    } else {
      alert('Invalid input');
    }
  }

  render() {
    const { inputValue } = this.state;

    return(
      <div className='pair-input'>
        <h2>Number of pairs?</h2>
        <p>Choose a number between 2 and 50</p>
        <form onSubmit={this.handleSubmit} className='form'>
          <input className='input' type='number' value={inputValue} onChange={this.handleChange}/>
          <button type='submit' className='button'>START GAME</button>
        </form>
      </div>
    )
  }
}

export default Input;