import React, { Component } from 'react';
import * as Constants from './constants';

// TODO: move to utilities
export function parseStorage(ticker) {
  let portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
  if (!portfolio) {
    window.localStorage.setItem(
      'portfolio',
      JSON.stringify({
        name: 'To The Moon',
        lots: [],
      })
    );
    portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
  }
  portfolio.lots.push({
    symbol: ticker.toUpperCase(),
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
