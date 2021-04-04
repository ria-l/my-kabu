import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import { Line } from 'react-chartjs-2';
import * as chartUtils from '../utils/chartUtils';
import * as dateUtils from '../utils/dateUtils';
import * as utilities from '../utils/utilities';

export class PortfolioChart extends Component {
  state = { submitted: false };

  // Options for rendering Chart.js.
  getOptions = () => {
    return {
      responsive: true,
    };
  };

  getChartData = async () => {
    let chartLabels;
    if (this.state.startDate && this.state.endDate) {
      chartLabels = await chartUtils.getChartLabels(
        this.state.startDate.toDate(),
        this.state.endDate.toDate()
      );
    } else {
      const today = dateUtils.setTimeToNoon(new Date());
      let startDate = new Date();
      startDate.setHours(12, 0, 0, 0);
      startDate.setDate(startDate.getDate() - 2);
      chartLabels = await chartUtils.getChartLabels(startDate, today);
    }

    const chartData = {
      labels: chartLabels.xAxisLabels,
      datasets: [
        {
          label: 'Portfolio value over time',
          data: chartLabels.dataPoints,
          fill: false,
          borderColor: ['rgba(0, 200, 5, 1)'],
          borderWidth: 1,
          lineTension: 0,
        },
      ],
    };

    return chartData;
  };

  async componentDidMount() {
    const chartData = await this.getChartData();
    this.setState({ chartData: chartData });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.submitted !== prevState.submitted) {
      const chartData = await this.getChartData();
      this.setState({ chartData: chartData });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const chartData = await this.getChartData();
    this.setState({ chartData: chartData });
  };

  render() {
    return (
      <div>
        <table id="the-chart">
          <tbody>
            <tr>
              <td>
                <div className="chart-wrapper">
                  <Line
                    redraw={false}
                    data={
                      this.state.chartData || {
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
          <h2>Select a date range for the chart</h2>

          {/* // TODO: disallow future dates */}
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
