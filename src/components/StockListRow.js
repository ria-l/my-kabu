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
    const todaysPrice = await apiCalls.getLastValidPrice(ticker, today);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdaysPrice = await apiCalls.getLastValidPrice(ticker, yesterday);
    const boughtDate = new Date(portfolio.lots[this.props.lot].boughtDate);
    let startValue = await apiCalls.getLastValidPrice(ticker, boughtDate);

    this.setState({ todaysPrice, yesterdaysPrice, startValue });
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

        <td>
          {/* today's close */}
          {this.state.todaysPrice ? `$${this.state.todaysPrice}` : 0}
        </td>

        <td>{numShares}</td>

        <td>
          {/* {Market Value} */}
          {todaysValue ? `$${todaysValue.toFixed(2)}` : 0}
        </td>

        <td>
          {/* {Daily Gain} */}
          {todaysValue ? `$${(todaysValue - yesterdaysValue).toFixed(2)}` : 0}
          <br />
          {utilities.calculatePercentChange(yesterdaysValue, todaysValue)}
        </td>

        {/* {Total gain} */}
        <td>
          {this.state.todaysPrice
            ? `$${(this.state.todaysPrice - this.state.startValue).toFixed(2)}`
            : 0}
          <br />
          {utilities.calculatePercentChange(
            this.state.startValue,
            this.state.todaysPrice
          )}
        </td>
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
