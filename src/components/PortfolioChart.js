import React, { Component } from 'react';
import { DatePicker } from 'antd';
import { Line } from 'react-chartjs-2';
import * as chartUtils from '../utils/chartUtils';
import * as dateUtils from '../utils/dateUtils';
import moment from 'moment';

const { RangePicker } = DatePicker;

export class PortfolioChart extends Component {
  state = { submitted: false };

  // Options for rendering Chart.js.
  getOptions = () => {
    return {
      responsive: true,
    };
  };

  getChartData = async (range) => {
    let chartLabels;
    if (range) {
      chartLabels = await chartUtils.getChartLabels(range[0], range[1]);
    } else if (this.state.startDate && this.state.endDate) {
      chartLabels = await chartUtils.getChartLabels(
        this.state.startDate.toDate(),
        this.state.endDate.toDate()
      );
    } else {
      const today = dateUtils.setTimeToNoon(new Date());
      let startDate = new Date();
      startDate.setHours(12, 0, 0, 0);
      startDate.setDate(startDate.getDate() - 6);
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

  handleDateChange = async (range) => {
    const chartData = await this.getChartData(range);
    this.setState({ chartData: chartData });
  };

  disabledDate(current) {
    // Cannot select days after today
    return current > moment().endOf('day');
  }

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
          <RangePicker
            defaultValue={[moment().subtract(1, 'weeks'), moment()]}
            ranges={{
              Today: [moment(), moment()],
              'Last 30 days': [moment().subtract(1, 'months'), moment()],
              'This week': [moment().subtract(1, 'weeks'), moment()],
              'Last week': [
                moment().subtract(2, 'weeks'),
                moment().subtract(1, 'weeks'),
              ],
              'Last month': [
                moment().subtract(1, 'months').startOf('month'),
                moment().subtract(1, 'months').endOf('month'),
              ],
            }}
            disabledDate={this.disabledDate}
            onChange={this.handleDateChange}
          />
        </form>
      </div>
    );
  }
}
