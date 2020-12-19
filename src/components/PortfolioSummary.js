import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import React, { Component } from 'react';
import { PortfolioChart } from './PortfolioChart';
import * as dateUtils from '../utils/dateUtils';
import * as chartUtils from '../utils/chartUtils';

class PortfolioSummary extends Component {
  state = { submitted: false, todaysValue: 0, yesterdaysValue: 0, dayGain: 0 };

  setSubmittedState = (state) => {
    this.setState({ submitted: state });
  };

  getPortfolioValue = async (date = new Date()) => {
    if (!portfolio) {
      return 0;
    }
    const dateCopy = dateUtils.setTimeToNoon(date);
    return await chartUtils.getPortfolioValue(portfolio, dateCopy);
  };

  async componentDidMount() {
    const todaysValue = await this.getPortfolioValue();
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdaysValue = await this.getPortfolioValue(yesterday);
    const dayGain = todaysValue - yesterdaysValue;
    utilities.calculatePercentChange(yesterdaysValue, todaysValue);

    this.setState({
      todaysValue,
      yesterdaysValue,
      dayGain: dayGain.toFixed(2),
    });
  }

  render() {
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));

    return (
      <div className="main">
        <div>
          <h1>{portfolio && portfolio.name}</h1>
          <h2>${this.state.todaysValue}</h2>
        </div>
        <div>
          Day Gain: ${this.state.dayGain} (+
          {((this.state.dayGain / this.state.yesterdaysValue) * 100).toFixed(2)}
          %)
          <br />
          {/* Total Gain: ${totalGain} (
          {((totalGain / depositValue) * 100).toFixed(2)}%) */}
        </div>
        <PortfolioChart submitted={this.setSubmittedState} />
      </div>
    );
  }
}

export default PortfolioSummary;
