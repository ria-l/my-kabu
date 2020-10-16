import React, { Component } from 'react';
import { render } from 'react-dom';
import * as Constants from './constants';
import Chart from 'chart.js';

export function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

/**
 *
 * @param {string} ticker
 */
export function getTodaysPrice(ticker) {
  let today = formatDate(new Date());
  const tickerData = Constants.API_PRICES[ticker];

  for (const entry in tickerData) {
    const cleanDate = tickerData[entry].date.split('T')[0];

    if (cleanDate === today) {
      return tickerData[entry].adjClose;
    }
  }
}

/**
 *
 * @param {string} ticker
 */
export function getYesterdaysPrice(ticker) {
  let yesterday = new Date();
  yesterday = yesterday.setDate(yesterday.getDate() - 1);
  yesterday = formatDate(yesterday);
  for (const entry in Constants.API_PRICES[ticker]) {
    const cleanDate = Constants.API_PRICES[ticker][entry].date.split('T')[0];
    if (cleanDate === yesterday) {
      return Constants.API_PRICES[ticker][entry].adjClose;
    }
  }
}

/**
 *
 * @param {number} oldValue
 * @param {number} newValue
 */
export function calculatePercentChange(oldValue, newValue) {
  if (oldValue && newValue) {
    return (((newValue - oldValue) / oldValue) * 100).toFixed(2) + '%';
  } else {
    return null;
  }
}

/**
 *
 * @param {number} lot
 */
export function getNumberOfShares(lot) {
  const portfolio = window.localStorage.getItem('portfolio');
  if (portfolio) {
    const portfolioEntry = JSON.parse(portfolio).lots[lot];
    return portfolioEntry.buyShares - portfolioEntry.sellShares;
  }
  return 0;
}

class StockList extends Component {
  // state = {};

  render() {
    const rows = [];
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    if (portfolio) {
      for (const lot in portfolio.lots) {
        rows.push(<StockListRow lot={lot} key={lot} />);
      }
    }

    return (
      <div className="main">
        <table>
          <tbody>
            <tr>
              <th>Stock</th>
              <th>Graph</th>
              <th>Today's close</th>
              <th>Change since...</th>
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

class StockListRow extends Component {
  render() {
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    const symbol = portfolio.lots[this.props.lot].symbol;
    const numShares = getNumberOfShares(this.props.lot);
    const todaysPrice = getTodaysPrice(symbol);
    const yesterdaysPrice = getYesterdaysPrice(symbol);
    const yesterdaysValue = numShares * yesterdaysPrice;
    const todaysValue = numShares * todaysPrice;
    console.log(symbol, todaysPrice);

    return (
      <tr>
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
          {calculatePercentChange(yesterdaysPrice, todaysPrice)}
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
          {calculatePercentChange(yesterdaysValue, todaysValue)}
        </td>
        {/* Total gain */}
        <td></td>
      </tr>
    );
  }
}

export default StockList;
