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
      maintainAspectRatio: false,
    };
  };

  async componentDidMount() {
    const chartData = await chartUtils.getChartData(
      undefined,
      this.state.startDate,
      this.state.endDate
    );
    this.setState({ chartData: chartData });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.submitted !== prevState.submitted) {
      const chartData = await chartUtils.getChartData(
        undefined,
        this.state.startDate,
        this.state.endDate
      );
      this.setState({ chartData: chartData });
    }
  }

  handleDateChange = async (range) => {
    const chartData = await chartUtils.getChartData(range);
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
          <h3>Select a date range for the chart</h3>
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
