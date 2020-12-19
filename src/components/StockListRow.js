import React, { Component } from 'react';
import * as utilities from '../utils/utilities';
import * as apiCalls from '../utils/apiCalls';

export class StockListRow extends Component {
  state = { todaysPrice: 0, yesterdaysPrice: 0 };

  handleClick = (name, id) => {
    if (name === 'delete') {
      this.props.onDelete(id);
    }
    if (name === 'edit') {
      this.props.onEdit(id);
    }
  };

  async componentDidMount() {
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    const ticker = portfolio.lots[this.props.lot].ticker;
    const today = new Date();
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    debugger;
    const todaysPrice = await apiCalls.getStockPrice(ticker, today);
    debugger;
    const yesterdaysPrice = await apiCalls.getStockPrice(ticker, yesterday);
    debugger;
    this.setState({ todaysPrice, yesterdaysPrice });
  }

  render() {
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    const ticker = portfolio.lots[this.props.lot].ticker;
    const id = portfolio.lots[this.props.lot].id;
    const numShares = utilities.getNumberOfShares(this.props.lot);
    const boughtDate = portfolio.lots[this.props.lot].boughtDate;

    let yesterdaysValue = 0;
    let todaysValue = 0;

    if (this.state.todaysPrice && this.state.yesterdaysPrice) {
      yesterdaysValue = numShares * this.state.yesterdaysPrice;
      todaysValue = numShares * this.state.todaysPrice;
    }

    return (
      <tr>
        <td>{id}</td>

        <td>{ticker}</td>

        <td>{boughtDate}</td>

        <td>{this.state.todaysPrice ? `$${this.state.todaysPrice}` : null}</td>

        <td>
          {this.state.todaysPrice
            ? `$${(this.state.todaysPrice - this.state.yesterdaysPrice).toFixed(
                2
              )}`
            : null}
          <br />
          {utilities.calculatePercentChange(
            this.state.yesterdaysPrice,
            this.state.todaysPrice
          )}
        </td>

        <td>{numShares}</td>

        <td>{todaysValue ? `$${todaysValue.toFixed(2)}` : null}</td>

        <td>
          {todaysValue
            ? `$${(todaysValue - yesterdaysValue).toFixed(2)}`
            : null}
          <br />
          {utilities.calculatePercentChange(yesterdaysValue, todaysValue)}
        </td>

        <td></td>
        <td>
          <button onClick={() => this.handleClick('delete', id)}>Delete</button>
        </td>
        <td>
          <button onClick={() => this.handleClick('edit', id)}>Edit</button>
        </td>
      </tr>
    );
  }
}
