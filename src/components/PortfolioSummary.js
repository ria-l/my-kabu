import React, { Component } from 'react';
import { PortfolioChart } from './PortfolioChart';
import * as dateUtils from '../utils/dateUtils';
import * as chartUtils from '../utils/chartUtils';
import * as utilities from '../utils/utilities';

class PortfolioSummary extends Component {
  state = { submitted: false, todaysValue: 0, yesterdaysValue: 0, dayGain: 0 };

  setSubmittedState = (state) => {
    this.setState({ submitted: state });
  };

  getPortfolioValue = async (date = new Date()) => {
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
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
          <h2>{portfolio && portfolio.name}</h2>
          Current value: ${this.state.todaysValue}
        </div>
        <div>
          Day Gain: ${this.state.dayGain} (+
          {this.state.yesterdaysValue > 0
            ? ((this.state.dayGain / this.state.yesterdaysValue) * 100).toFixed(
                2
              )
            : 0}
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
