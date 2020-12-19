import React, { Component } from 'react';

import * as utilities from '../utils/utilities';
import * as apiCalls from '../utils/apiCalls';

export class EditableStockListRow extends Component {
  state = {};

  handlers = {
    delete: (id, ticker, shares) => {
      this.props.onDelete(id);
    },
    save: (id, ticker, shares) => {
      this.props.onSaveOrCancel(id, ticker, shares);
    },
    cancel: (id, ticker, shares) => {
      this.props.onSaveOrCancel();
    },
  };

  /**
   * @param {string} btnName
   * @param {string} id Unique id of the row that is being edited.
   * @param {string} ticker
   * @param {number} numShares
   */
  handleClick = (btnName, id, ticker, numShares) => {
    this.handlers[btnName](id, ticker, numShares);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const portfolio = utilities.portfolio;
    const ticker = portfolio.lots[this.props.lot].ticker;
    const id = portfolio.lots[this.props.lot].id;
    const numShares = utilities.getNumberOfShares(this.props.lot);
    const today = new Date();
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const todaysPrice = apiCalls.getStockPrice(ticker, today);
    const yesterdaysPrice = apiCalls.getStockPrice(ticker, yesterday);
    const yesterdaysValue = numShares * yesterdaysPrice;
    const todaysValue = numShares * todaysPrice;

    return (
      <tr>
        {/* ID */}
        <td>{id}</td>
        {/* Symbol */}
        <td>
          <input
            name="ticker"
            value={this.state.ticker || ticker}
            onChange={this.handleChange}
          />
        </td>
        {/* Graph */}
        <td></td>
        {/* Today's Close */}
        <td>{todaysPrice ? `$${todaysPrice}` : null}</td>
        {/* Change */}
        <td>
          {todaysPrice
            ? `$${(todaysPrice - yesterdaysPrice).toFixed(2)}`
            : null}
          <br />
          {utilities.calculatePercentChange(yesterdaysPrice, todaysPrice)}
        </td>
        {/* Shares */}
        <td>
          <input
            name="numShares"
            value={this.state.numShares || numShares}
            onChange={this.handleChange}
          />
        </td>
        {/* Market Value */}
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
          <button name="delete" onClick={() => this.handleClick('delete', id)}>
            Delete
          </button>
        </td>
        <td>
          <button
            name="save"
            onClick={() => {
              this.handleClick(
                'save',
                id,
                this.state.ticker,
                this.state.numShares
              );
            }}
          >
            Save
          </button>
          <button
            name="cancel"
            onClick={() => {
              this.handleClick('cancel', id);
            }}
          >
            Cancel
          </button>
        </td>
      </tr>
    );
  }
}
