import React, { Component } from 'react';
import * as Constants from './Const';
// import Chart from 'chart.js';

const getCurrentValue = (ticker) => {
  return 30; // FIXME:
};

class PortfolioSummary extends Component {
  state = {};

  render() {
    let currValue = 0;
    for (const lot in Constants.PORTFOLIO.lots) {
      let currentShares =
        Constants.PORTFOLIO.lots[lot].buyShares -
        Constants.PORTFOLIO.lots[lot].sellShares;
      currValue +=
        getCurrentValue(Constants.PORTFOLIO.lots[lot].symbol) * currentShares;
    }

    let depositValue = 0;

    for (const deposit in Constants.DEPOSITS) {
      depositValue += Constants.DEPOSITS[deposit];
    }
    const totalGain = currValue - depositValue;
    const prevValue = 6; // FIXME:
    const dayGain = 7; // FIXME:

    return (
      <div className="main">
        <div>
          <h1>{Constants.PORTFOLIO.name}</h1>
          <h2>${currValue}</h2>
        </div>
        <div>
          Day Gain: ${dayGain} (+{((dayGain / prevValue) * 100).toFixed(2)}%)
          <br />
          Total Gain: ${totalGain} (
          {((totalGain / depositValue) * 100).toFixed(2)}%)
        </div>
        <PortfolioChart />
      </div>
    );
  }
}

class PortfolioChart extends Component {
  state = {};
  render() {
    return (
      <div>
        PortfolioChart
        <table>
          <tbody>
            <tr>
              <td>Chart!</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default PortfolioSummary;
