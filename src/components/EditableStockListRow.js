import React, { Component } from 'react';
import * as utilities from '../utils/utilities';
import * as apiCalls from '../utils/apiCalls';

export class EditableStockListRow extends Component {
  state = {};

  handleClick = (name, id, ticker, shares) => {
    if (name === 'delete') {
      this.props.onDelete(id);
    }
    if (name === 'save') {
      this.props.onSaveOrCancel(id, ticker, shares);
    }
    if (name === 'cancel') {
      this.props.onSaveOrCancel();
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    const ticker = portfolio.lots[this.props.lot].ticker;
    const id = portfolio.lots[this.props.lot].id;
    const numShares = utilities.getNumberOfShares(this.props.lot);
    const todaysPrice = apiCalls.getTodaysPrice(ticker);
    const yesterdaysPrice = apiCalls.getYesterdaysPrice(ticker);
    const yesterdaysValue = numShares * yesterdaysPrice;
    const todaysValue = numShares * todaysPrice;

    return (
      <tr>
        <td>{id}</td>

        <td>
          <input
            name="ticker"
            value={this.state.ticker || ticker}
            onChange={this.handleChange}
          />
        </td>

        <td></td>

        <td>{todaysPrice ? `$${todaysPrice}` : null}</td>

        <td>
          {todaysPrice
            ? `$${(todaysPrice - yesterdaysPrice).toFixed(2)}`
            : null}
          <br />
          {utilities.calculatePercentChange(yesterdaysPrice, todaysPrice)}
        </td>

        <td>
          <input
            name="numShares"
            value={this.state.numShares || numShares}
            onChange={this.handleChange}
          />
        </td>

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
