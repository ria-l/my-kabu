import React, { Component } from 'react';
import * as Constants from './constants';
import { Line } from 'react-chartjs-2';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import * as Utilities from './utilities';

const getCurrentValue = (ticker) => {
  return 30; // FIXME:
};

class PortfolioSummary extends Component {
  state = { submitted: false };

  setSubmittedState = (state) => {
    this.setState({ submitted: state });
  };

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
        <PortfolioChart submitted={this.setSubmittedState} />
      </div>
    );
  }
}

class PortfolioChart extends Component {
  state = {};

  getOptions = () => {
    return {
      responsive: true,
      scales: { yAxes: [{ ticks: { suggestedMin: -10 } }] },
    };
  };

  getData = () => {
    let chartData;
    if (this.state.startDate && this.state.endDate) {
      chartData = Utilities.prepDataForPortfolioChart(
        this.state.startDate._d,
        this.state.endDate._d
      );
    } else {
      const today = new Date();
      let startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      chartData = Utilities.prepDataForPortfolioChart(startDate, today);
    }
    return {
      labels: chartData.xAxisLabels,
      datasets: [
        {
          label: 'Portfolio value over time',
          data: chartData.yAxisLabels,
          fill: false,
          borderColor: ['rgba(0, 200, 5, 1)'],
          borderWidth: 1,
          lineTension: 0,
        },
      ],
    };
  };

  render() {
    return (
      <div>
        PortfolioChart
        <table id="the-chart">
          <tbody>
            <tr>
              <td>
                <div className="chart-wrapper">
                  <Line data={this.getData()} Options={this.getOptions()} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        Select a date range
        <DateRangePicker
          startDate={this.state.startDate}
          startDateId="start-date"
          endDate={this.state.endDate}
          endDateId="end-date"
          onDatesChange={({ startDate, endDate }) =>
            this.setState({ startDate, endDate })
          }
          focusedInput={this.state.focusedInput}
          onFocusChange={(focusedInput) => this.setState({ focusedInput })}
          isOutsideRange={Utilities.falseFunc}
        />
      </div>
    );
  }
}

export default PortfolioSummary;
