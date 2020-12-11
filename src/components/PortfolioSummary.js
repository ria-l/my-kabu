import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import React, { Component } from 'react';
import { PortfolioChart } from './PortfolioChart';
import * as dateUtils from '../utils/dateUtils';
import * as chartUtils from '../utils/chartUtils';

class PortfolioSummary extends Component {
  state = { submitted: false };

  setSubmittedState = (state) => {
    this.setState({ submitted: state });
  };

  getPortfolioValue = async () => {
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    if (!portfolio) {
      return 0;
    }
    const today = dateUtils.setTimeToNoon(new Date());

    return await chartUtils.getYAxisValue(portfolio, today);
  };

  async componentDidMount() {
    const currValue = await this.getPortfolioValue();
    this.setState({ currValue: currValue });
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

export default PortfolioSummary;
