import React, { Component } from 'react';
import * as Constants from './constants';

function parseStorage(ticker) {
  const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
  console.log(portfolio);
  console.log(ticker);
  portfolio.lots.push({
    symbol: ticker,
    buyShares: 0,
    buyDate: null,
    broker: null,
    buyPrice: null,
    sellShares: 0,
    sellDate: null,
    sellPrice: null,
  });
  window.localStorage.setItem('portfolio', JSON.stringify(portfolio));
}

class AddLot extends React.Component {
  state = { value: null, submitted: false };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    // alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
    this.props.itsAProp(true);
    parseStorage(this.state.value);
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
            Add a stock:
            <input value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.props.submitted && <h1>{this.state.value}</h1>}
      </>
    );
  }
}

export default AddLot;
