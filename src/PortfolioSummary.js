import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import { Line } from 'react-chartjs-2';
import * as Constants from './constants';
import * as Utilities from './utilities';
import React, { Component } from 'react';

class PortfolioSummary extends Component {
  state = { submitted: false };

  setSubmittedState = (state) => {
    this.setState({ submitted: state });
  };

  getPortfolioValue = async () => {
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    let currValue;
    if (!portfolio) {
      return 0;
    }
    const today = Constants.getToday();
    currValue = await Utilities.getYAxisValue(portfolio, today);
    return currValue;
  };

  async componentDidMount() {
    const currValue = await this.getPortfolioValue();
    this.setState({ currValue: currValue }, () => {
      console.log(this.state);
    });
  }

  render() {
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));

    // let depositValue = 0;

    // for (const deposit in Constants.DEPOSITS) {
    //   depositValue += Constants.DEPOSITS[deposit];
    // }
    // const totalGain = currValue - depositValue;
    const prevValue = 6; // FIXME:
    const dayGain = 7; // FIXME:

    return (
      <div className="main">
        <div>
          <h1>{portfolio && portfolio.name}</h1>
          <h2>${this.state.currValue}</h2>
        </div>
        <div>
          Day Gain: ${dayGain} (+{((dayGain / prevValue) * 100).toFixed(2)}%)
          <br />
          {/* Total Gain: ${totalGain} (
          {((totalGain / depositValue) * 100).toFixed(2)}%) */}
        </div>
        <PortfolioChart submitted={this.setSubmittedState} />
      </div>
    );
  }
}

class PortfolioChart extends Component {
  state = { submitted: false };

  getOptions = () => {
    return {
      responsive: true,
    };
  };

  getData = async () => {
    let chartData;
    if (this.state.startDate && this.state.endDate) {
      chartData = await Utilities.prepDataForPortfolioChart(
        this.state.startDate._d,
        this.state.endDate._d
      );
    } else {
      const today = Constants.getToday();
      let startDate = new Date();
      startDate.setHours(12, 0, 0, 0);
      startDate.setDate(startDate.getDate() - 6);
      chartData = await Utilities.prepDataForPortfolioChart(startDate, today);
      console.log(chartData);
    }

    const result = {
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

    console.log(result);
    return result;
  };

  async componentDidMount() {
    const apiData = await this.getData();
    this.setState({ apiData: apiData }, () => {
      console.log(this.state);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let toggle = this.state.submitted;
    toggle = !toggle;

    const apiData = this.getData();
    console.log('getdate', apiData);
    this.setState({ apiData: apiData }, () => {
      this.setState({ submitted: toggle });
      console.log(this.state);
    });
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
                  <Line
                    redraw={true}
                    data={
                      this.state.apiData || {
                        labels: [],
                        datasets: [
                          {
                            label: 'Portfolio value over time',
                            data: [],
                            fill: false,
                            borderColor: ['rgba(0, 200, 5, 1)'],
                            borderWidth: 1,
                            lineTension: 0,
                          },
                        ],
                      }
                    }
                    options={this.getOptions()}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <form onSubmit={this.handleSubmit}>
          <label>Select a date range</label>
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
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
}

export default PortfolioSummary;
