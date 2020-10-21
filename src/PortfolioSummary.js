import React, { Component } from 'react';
import * as Constants from './constants';
import Chart from 'chart.js';
import * as Utilities from './utilities';

const getCurrentValue = (ticker) => {
  return 30; // FIXME:
};

class PortfolioSummary extends Component {
  state = {};

  render() {
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));

    let currValue = 0;
    if (portfolio) {
      for (const lot in portfolio.lots) {
        let currentShares =
          portfolio.lots[lot].boughtShares - portfolio.lots[lot].soldShares;
        currValue +=
          getCurrentValue(portfolio.lots[lot].symbol) * currentShares;
      }
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
          <h1>{portfolio && portfolio.name}</h1>
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
  chartRef = React.createRef();
  componentDidMount() {
    const portfolioChartRef = this.chartRef.current.getContext('2d');
    const chartData = Utilities.getDataForChart('AMZN');
    new Chart(portfolioChartRef, {
      type: 'line',
      data: {
        labels: chartData.xAxisLabels,
        datasets: [
          {
            label: 'Portfolio value over time',
            data: chartData.yAxisLabels,
            backgroundColor: ['rgba(0, 200, 5, 0.2)'],
            borderColor: ['rgba(0, 200, 5, 1)'],
            borderWidth: 1,
            lineTension: 0,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
  render() {
    return (
      <div>
        PortfolioChart
        <table>
          <tbody>
            <tr>
              <td>
                <div className="chart-wrapper">
                  <canvas
                    id="portfolioChart"
                    ref={this.chartRef}
                    width="6"
                    height="4"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default PortfolioSummary;
