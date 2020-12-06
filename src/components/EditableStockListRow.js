import React, { Component } from 'react';
import * as Utilities from '../utils/utilities';
import * as ApiCalls from '../utils/apiCalls';

export class EditableStockListRow extends Component {
  state = {};
  handleClick = (name, id, symbol, shares) => {
    if (name === 'delete') {
      this.props.onDelete(id);
    }
    if (name === 'save') {
      this.props.onSaveOrCancel(id, symbol, shares);
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
    const symbol = portfolio.lots[this.props.lot].symbol;
    const id = portfolio.lots[this.props.lot].id;
    const numShares = Utilities.getNumberOfShares(this.props.lot);
    const todaysPrice = ApiCalls.getTodaysPrice(symbol);
    const yesterdaysPrice = ApiCalls.getYesterdaysPrice(symbol);
    const yesterdaysValue = numShares * yesterdaysPrice;
    const todaysValue = numShares * todaysPrice;

    return (
      <tr>
        <td>{id}</td>

        <td>
          <input
            name="symbol"
            value={this.state.symbol || symbol}
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
          {Utilities.calculatePercentChange(yesterdaysPrice, todaysPrice)}
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
          {Utilities.calculatePercentChange(yesterdaysValue, todaysValue)}
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
                this.state.symbol,
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
