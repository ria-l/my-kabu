import React, { useState } from 'react';
import { StockListRow } from './StockListRow';
import { EditableStockListRow } from './EditableStockListRow';
import * as portfolioUtils from '../utils/portfolioUtils';

const StockList = (props) => {
  const [rerender, setRerender] = useState(false);
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState();

  const deleteRow = (id) => {
    portfolioUtils.deleteLotFromPortfolio(id);
    props.rerender();
  };

  const editRow = (id) => {
    setEditing(true);
    setId(id);
  };

  const finishEditingRow = (id, ticker, boughtShares) => {
    if (id) {
      portfolioUtils.updatePortfolio(id, ticker, boughtShares);
    }
    setEditing(false);
    setRerender(true);
    props.rerender();
  };

  const rows = [];
  const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
  if (portfolio) {
    for (const lot in portfolio.lots) {
      if (editing === true && portfolio.lots[lot].id === id) {
        rows.push(
          <EditableStockListRow
            key={portfolio.lots[lot].id}
            lot={lot}
            onDelete={deleteRow}
            onSaveOrCancel={finishEditingRow}
          />
        );
      } else {
        rows.push(
          <StockListRow
            key={portfolio.lots[lot].id}
            lot={lot}
            onDelete={deleteRow}
            onEdit={editRow}
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
            <th>ID</th>
            <th>Stock</th>
            <th>Buy Date</th>
            <th>Today's close</th>
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
};

export default StockList;
