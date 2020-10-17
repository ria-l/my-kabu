import React, { Component } from 'react';
import * as Constants from './constants';
import * as Utilities from './utilities';
import Chart from 'chart.js';

class TickerPicker extends Component {
  selectTicker = () => {
    console.log('sup');
  };
  render() {
    return (
      <div className="main">
        <form>
          <label htmlFor="ticker">Ticker</label>
          <input
            type="text"
            name="ticker"
            value="FAKE"
            onChange={this.selectTicker}
          />
          <input type="button" value="submit" onClick={this.submitForm} />
        </form>
        <div>
          <h1>Microsoft</h1>
          <h2>{Constants.API_PRICES['MSFT'][0]['close']}</h2>
          +$4.63 (+2.28%) Today
          <br />
          -$0.77 (-0.37%) After Hours
          <table>
            <tbody>
              <tr>
                <td>
                  <PortfolioChart />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

// TODO: dedupe
class PortfolioChart extends Component {
  state = {};
  chartRef = React.createRef();
  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext('2d');
    const chartData = Utilities.getDataForChart('MSFT');
    new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: chartData.xAxisLabels,
        datasets: [
          {
            label: `${chartData.ticker}: ${chartData.name}`,
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
                    id="secondChart"
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

export default TickerPicker;
