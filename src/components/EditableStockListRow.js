import React, { Component } from 'react';
import { DatePicker } from 'antd';
import * as utilities from '../utils/utilities';
import * as apiCalls from '../utils/apiCalls';
import moment from 'moment';

export class EditableStockListRow extends Component {
  state = {};

  handlers = {
    delete: (id, ticker, shares) => {
      this.props.onDelete(id);
    },
    save: (id, ticker, shares, boughtDate, boughtPrice) => {
      this.props.onSaveOrCancel(id, ticker, shares, boughtDate, boughtPrice);
      console.log(boughtPrice);
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
  handleClick = (btnName, id, ticker, numShares, boughtDate, boughtPrice) => {
    this.handlers[btnName](id, ticker, numShares, boughtDate, boughtPrice);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDateChange = (date) => {
    this.setState({ boughtDate: date.toDate() });
  };

  async componentDidMount() {
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    const ticker = portfolio.lots[this.props.lot].ticker;

    const today = new Date();
    const todaysPrice = await apiCalls.getLastValidPrice(ticker, today);

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
    const boughtDate = portfolio.lots[this.props.lot].boughtDate;
    const boughtPrice = portfolio.lots[this.props.lot].boughtPrice;

    return (
      <tr>
        {/* <td>
          ID
          {id}
        </td> */}
        <td>
          {/* Stock */}
          <input
            name="ticker"
            value={this.state.ticker || ticker}
            onChange={this.handleChange}
          />
        </td>
        <td>
          {/* Buy Date */}
          <DatePicker
            defaultValue={moment(boughtDate)}
            name="boughtDate"
            onChange={this.handleDateChange}
          />
        </td>
        <td>
          {/* Shares */}
          <input
            name="numShares"
            value={this.state.numShares || numShares}
            onChange={this.handleChange}
          />
        </td>
        <td>
          {/*Cost per share*/}
          <input
            name="boughtPrice"
            value={this.state.boughtPrice || boughtPrice}
            onChange={this.handleChange}
          />
        </td>
        <td>
          {/* Today's Close */}
          {this.state.todaysPrice ? `$${this.state.todaysPrice}` : 0}
        </td>
        <td>
          {/* Market Value */}
          {todaysValue ? `$${todaysValue.toFixed(2)}` : 0}
        </td>
        <td>
          {/* Daily Gain */}
          {todaysValue ? `$${(todaysValue - yesterdaysValue).toFixed(2)}` : 0}
          <br />
          {utilities.calculatePercentChange(yesterdaysValue, todaysValue)}
        </td>
        <td>
          {/* {Total gain} */}
          yo{this.state.boughtPrice} <br />
          {this.state.todaysPrice
            ? `$${(this.state.todaysPrice - this.state.boughtPrice).toFixed(2)}`
            : 0}
          <br />
          {utilities.calculatePercentChange(
            this.state.boughtPrice,
            this.state.todaysPrice
          )}
        </td>
        <td>
          <button
            name="save"
            onClick={() => {
              this.handleClick(
                'save',
                id,
                this.state.ticker,
                this.state.numShares,
                this.state.boughtDate,
                this.state.boughtPrice
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
        <td>
          <button name="delete" onClick={() => this.handleClick('delete', id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}
