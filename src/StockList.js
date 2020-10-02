import React, { Component } from 'react';
import { render } from 'react-dom';
import * as Constants from './Const';
// import Chart from 'chart.js';

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function getTodaysPrice(ticker) {
  return Constants.API_TODAY_PRICE[ticker][0].adjClose;
}

function getYesterdaysPrice(ticker) {
  return Constants.API_PRICES[ticker][26].adjClose;
}

function calculatePercentChange(oldValue, newValue) {
  return ((newValue - oldValue) / oldValue) * 100;
}

function getNumberOfShares(lot) {
  return (
    Constants.PORTFOLIO.lots[lot].buyShares -
    Constants.PORTFOLIO.lots[lot].sellShares
  );
}
class StockListRow extends Component {
  render() {
    // let columns = [];

    // for (const col in Constants.PORTFOLIO.lots[this.props.lot]) {
    //   columns.push(<td>{Constants.PORTFOLIO.lots[this.props.lot][col]}</td>);
    // }
    const symbol = Constants.PORTFOLIO.lots[this.props.lot].symbol;

    return (
      <tr>
        <td>{symbol}</td>
        <td>Graph!</td>
        <td>${getTodaysPrice(symbol)}</td>
        <td>
          ${(getTodaysPrice(symbol) - getYesterdaysPrice(symbol)).toFixed(2)}
          <br />
          {calculatePercentChange(
            getYesterdaysPrice(symbol),
            getTodaysPrice(symbol)
          ).toFixed(2)}
          %
        </td>
        <td>{getNumberOfShares(this.props.lot)}</td>
        <td>
          $
          {(getNumberOfShares(this.props.lot) * getTodaysPrice(symbol)).toFixed(
            2
          )}
        </td>
        <td>
          {(
            getNumberOfShares(this.props.lot) * getTodaysPrice(symbol) -
            getNumberOfShares(this.props.lot) * getYesterdaysPrice(symbol)
          ).toFixed(2)}
          <br />
          {calculatePercentChange(
            getNumberOfShares(this.props.lot) * getYesterdaysPrice(symbol),
            getNumberOfShares(this.props.lot) * getTodaysPrice(symbol)
          ).toFixed(2)}
          %
        </td>
        <td>
          <strike>Total Gain</strike>
        </td>
      </tr>
    );
  }
}

class StockList extends Component {
  // state = {};

  render() {
    const rows = [];

    for (const lot in Constants.PORTFOLIO.lots) {
      rows.push(<StockListRow lot={lot} key={lot} />);
    }

    return (
      <div className="main">
        <table>
          <tbody>
            <tr>
              <th>Stock</th>
              <th>Graph</th>
              <th>Current Price</th>
              <th>Change</th>
              <th>Shares</th>
              <th>Market Value</th>
              <th>Daily Gain</th>
              <th>Total Gain</th>
            </tr>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StockList;
