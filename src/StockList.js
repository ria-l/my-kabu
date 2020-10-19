import React, { Component } from 'react';
import * as Utilities from './utilities';

class StockList extends Component {
  state = { changed: false };

  handleDeleteRequest = (id) => {
    Utilities.deleteLotFromPortfolio(id);
    this.setState({ changed: true });
  };

  render() {
    const rows = [];
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    if (portfolio) {
      for (const lot in portfolio.lots) {
        rows.push(
          <StockListRow
            lot={lot}
            key={lot}
            onDeleteRequest={this.handleDeleteRequest}
          />
        );
      }
    }

    return (
      <div className="main">
        <table>
          <tbody>
            <tr>
              {/* // TODO: Delete 'ID" later */}
              <th>ID</th>
              <th>Stock</th>
              <th>Graph</th>
              <th>Today's close</th>
              <th>Change since...</th>
              <th>Shares</th>
              <th>Market Value</th>
              <th>Daily Gain</th>
              <th>Total Gain</th>
              <th>Delete</th>
            </tr>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

class StockListRow extends Component {
  handleClick = (id) => {
    this.props.onDeleteRequest(id);
  };

  render() {
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    const symbol = portfolio.lots[this.props.lot].symbol;
    const id = portfolio.lots[this.props.lot].id;
    const numShares = Utilities.getNumberOfShares(this.props.lot);
    const todaysPrice = Utilities.getTodaysPrice(symbol);
    const yesterdaysPrice = Utilities.getYesterdaysPrice(symbol);
    const yesterdaysValue = numShares * yesterdaysPrice;
    const todaysValue = numShares * todaysPrice;

    return (
      <tr>
        {/* ID TODO: delete later */}
        <td>{id}</td>
        {/* Stock */}
        <td>{symbol}</td>
        {/* Graph */}
        <td>Graph!</td>
        {/* Today's close */}
        <td>{todaysPrice ? `$${todaysPrice}` : null}</td>
        {/* Change since... */}
        <td>
          {todaysPrice
            ? `$${(todaysPrice - yesterdaysPrice).toFixed(2)}`
            : null}
          <br />
          {Utilities.calculatePercentChange(yesterdaysPrice, todaysPrice)}
        </td>
        {/* Shares */}
        <td>{numShares}</td>
        {/* Market value */}
        <td>{todaysValue ? `$${todaysValue.toFixed(2)}` : null}</td>
        {/* Daily gain */}
        <td>
          {todaysValue
            ? `$${(todaysValue - yesterdaysValue).toFixed(2)}`
            : null}
          <br />
          {Utilities.calculatePercentChange(yesterdaysValue, todaysValue)}
        </td>
        {/* Total gain */}
        <td></td>
        <td>
          <button onClick={() => this.handleClick(id)}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default StockList;
