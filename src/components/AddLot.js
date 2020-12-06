import React from 'react';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

import * as utilities from '../utils/utilities';
import * as portfolioUtils from '../utils/portfolioUtils';

class AddLot extends React.Component {
  state = {
    submitted: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitted(true);
    portfolioUtils.addLotToPortfolio(
      this.state.ticker,
      this.state.boughtShares,
      this.state.boughtPrice,
      this.state.date._d,
      this.state.broker
    );
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h2>What did you buy??</h2>
          <label>Stock: </label>
          <input
            name="ticker"
            onChange={this.handleChange}
            value={this.state.ticker || ''}
          />
          <br />
          <label>Number of shares: </label>
          <input
            name="boughtShares"
            onChange={this.handleChange}
            value={this.state.boughtShares || ''}
          />
          <br />
          <label>Buy price: </label>
          <input
            name="boughtPrice"
            onChange={this.handleChange}
            value={this.state.boughtPrice || ''}
          />
          <br />
          <label>Buy date: </label>
          <SingleDatePicker
            date={this.state.date}
            onDateChange={(date) => this.setState({ date })}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            id="your_unique_id"
            isOutsideRange={utilities.falseFunc}
          />
          <br />
          <label>Broker: </label>
          <input
            name="broker"
            onChange={this.handleChange}
            value={this.state.broker || ''}
          />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default AddLot;
