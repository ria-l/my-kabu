import React, { Component } from 'react';
import * as Utilities from './utilities';

class StockList extends Component {
  state = { rerender: false, editing: false };

  deleteRow = (id) => {
    Utilities.deleteLotFromPortfolio(id);
    this.setState({ rerender: true });
  };

  editRow = (id) => {
    this.setState({ editing: true, id });
  };

  finishEditingRow = (id, symbol, boughtShares) => {
    if (id) {
      Utilities.updatePortfolio(id, symbol, boughtShares);
    }
    this.setState({ editing: false, rerender: true });
  };

  render() {
    const rows = [];
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));

    if (portfolio) {
      for (const lot in portfolio.lots) {
        if (
          this.state.editing === true &&
          portfolio.lots[lot].id === this.state.id
        ) {
          rows.push(
            <EditableStockListRow
              key={portfolio.lots[lot].id}
              lot={lot}
              onDelete={this.deleteRow}
              onSaveOrCancel={this.finishEditingRow}
            />
          );
        } else {
          rows.push(
            <StockListRow
              key={portfolio.lots[lot].id}
              lot={lot}
              onDelete={this.deleteRow}
              onEdit={this.editRow}
            />
          );
        }
      }
    }

    return (
      <div className="main">
        <table id="stocklist">
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
              <th>Edit</th>
            </tr>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

class StockListRow extends Component {
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
    const todaysPrice = Utilities.getTodaysPrice(symbol);
    const yesterdaysPrice = Utilities.getYesterdaysPrice(symbol);
    const yesterdaysValue = numShares * yesterdaysPrice;
    const todaysValue = numShares * todaysPrice;
    const boughtDate = portfolio.lots[this.props.lot].boughtDate;
    return (
      <tr>
        {/* ID TODO: delete later */}
        <td>{id}</td>
        {/* Stock */}
        <td>{symbol}</td>
        {/* Graph */}
        <td>{boughtDate}</td>
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
          <button onClick={() => this.handleClick('delete', id)}>Delete</button>
        </td>
        <td>
          <button onClick={() => this.handleClick('edit', id)}>Edit</button>
        </td>
      </tr>
    );
  }
}

class EditableStockListRow extends Component {
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
    const todaysPrice = Utilities.getTodaysPrice(symbol);
    const yesterdaysPrice = Utilities.getYesterdaysPrice(symbol);
    const yesterdaysValue = numShares * yesterdaysPrice;
    const todaysValue = numShares * todaysPrice;

    return (
      <tr>
        {/* TODO: delete ID later */}
        <td>{id}</td>
        {/* Stock */}
        <td>
          <input
            name="symbol"
            defaultValue={symbol}
            value={this.state.symbol}
            onChange={this.handleChange}
          />
        </td>
        {/* Graph */}
        <td></td>
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
        <td>
          <input
            name="numShares"
            defaultValue={numShares}
            value={this.state.numShares}
            onChange={this.handleChange}
          />
        </td>
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

export default StockList;
