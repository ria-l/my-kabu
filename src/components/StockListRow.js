import React, { Component } from 'react';
import * as Utilities from '../utils/utilities';
import * as ApiCalls from '../utils/apiCalls';

export class StockListRow extends Component {
  handleClick = (name, id) => {
    if (name === 'delete') {
      this.props.onDelete(id);
    }
    if (name === 'edit') {
      this.props.onEdit(id);
    }
  };

  render() {
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    const symbol = portfolio.lots[this.props.lot].symbol;
    const id = portfolio.lots[this.props.lot].id;
    const numShares = Utilities.getNumberOfShares(this.props.lot);
    const todaysPrice = ApiCalls.getTodaysPrice(symbol);
    const yesterdaysPrice = ApiCalls.getYesterdaysPrice(symbol);
    const yesterdaysValue = numShares * yesterdaysPrice;
    const todaysValue = numShares * todaysPrice;
    const boughtDate = portfolio.lots[this.props.lot].boughtDate;
    return (
      <tr>
        <td>{id}</td>

        <td>{symbol}</td>

        <td>{boughtDate}</td>

        <td>{todaysPrice ? `$${todaysPrice}` : null}</td>

        <td>
          {todaysPrice
            ? `$${(todaysPrice - yesterdaysPrice).toFixed(2)}`
            : null}
          <br />
          {Utilities.calculatePercentChange(yesterdaysPrice, todaysPrice)}
        </td>

        <td>{numShares}</td>

        <td>{todaysValue ? `$${todaysValue.toFixed(2)}` : null}</td>

        <td>
          {todaysValue
            ? `$${(todaysValue - yesterdaysValue).toFixed(2)}`
            : null}
          <br />
          {Utilities.calculatePercentChange(yesterdaysValue, todaysValue)}
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
