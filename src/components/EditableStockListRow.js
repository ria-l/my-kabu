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

  async componentDidMount() {
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    const ticker = portfolio.lots[this.props.lot].ticker;

    const today = new Date();
    const todaysPrice = await apiCalls.getStockPrice(ticker, today);

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdaysPrice = await apiCalls.getStockPrice(ticker, yesterday);

    this.setState({
      todaysPrice: todaysPrice,
      yesterdaysPrice: yesterdaysPrice,
    });
  }
  render() {
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    const ticker = portfolio.lots[this.props.lot].ticker;
    const id = portfolio.lots[this.props.lot].id;
    const numShares = utilities.getNumberOfShares(this.props.lot);
    const today = new Date();
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const todaysPrice = this.state.todaysPrice;
    const yesterdaysPrice = this.state.yesterdaysPrice;
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
        {/* Buy Date */}
        <td></td>
        {/* Today's Close */}
        <td>{todaysPrice ? `$${todaysPrice}` : 0}</td>
        {/* Shares */}
        <td>
          <input
            name="numShares"
            value={this.state.numShares || numShares}
            onChange={this.handleChange}
          />
        </td>
        {/* Market Value */}
        <td>{todaysValue ? `$${todaysValue.toFixed(2)}` : 0}</td>

        <td>
          {todaysValue ? `$${(todaysValue - yesterdaysValue).toFixed(2)}` : 0}
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
