import React, { Component } from 'react';
import * as PortfolioUtils from '../utils/portfolioUtils';
import { StockListRow } from './StockListRow';
import { EditableStockListRow } from './EditableStockListRow';

class StockList extends Component {
  state = { rerender: false, editing: false };

  deleteRow = (id) => {
    PortfolioUtils.deleteLotFromPortfolio(id);
    this.setState({ rerender: true });
    this.props.submitted(true);
  };

  editRow = (id) => {
    this.setState({ editing: true, id });
  };

  finishEditingRow = (id, ticker, boughtShares) => {
    if (id) {
      PortfolioUtils.updatePortfolio(id, ticker, boughtShares);
    }
    this.setState({ editing: false, rerender: true });
    this.props.submitted(true);
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

export default StockList;
