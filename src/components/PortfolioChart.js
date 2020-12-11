import React, { Component } from 'react';

import { DateRangePicker } from 'react-dates';
import { Line } from 'react-chartjs-2';

import * as chartUtils from '../utils/chartUtils';
import * as dateUtils from '../utils/dateUtils';
import * as utilities from '../utils/utilities';

export class PortfolioChart extends Component {
  state = { submitted: false };

  // Options for Chartjs rendering.
  getOptions = () => {
    return {
      responsive: true,
    };
  };

  getData = async () => {
    let chartData;
    if (this.state.startDate && this.state.endDate) {
      chartData = await chartUtils.getChartLabels(
        this.state.startDate._d,
        this.state.endDate._d
      );
    } else {
      const today = dateUtils.setTimeToNoon(new Date());
      let startDate = new Date();
      startDate.setHours(12, 0, 0, 0);
      startDate.setDate(startDate.getDate() - 6);
      chartData = await chartUtils.getChartLabels(startDate, today);
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

    return result;
  };

  async componentDidMount() {
    const apiData = await this.getData();
    this.setState({ apiData: apiData });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.submitted !== prevState.submitted) {
      const apiData = await this.getData();
      this.setState({ apiData: apiData });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const apiData = await this.getData();
    this.setState({ apiData: apiData });
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
                    redraw={false}
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
            isOutsideRange={utilities.falseFunc}
          />
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
}
