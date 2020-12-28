import React from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import * as utilities from '../utils/utilities';
import * as portfolioUtils from '../utils/portfolioUtils';

function MissingFields(props) {
  return <div>Missing field: {props.blankFields}</div>;
}

function Error(props) {
  const hasError = props.hasError;
  if (hasError) {
    return <MissingFields blankFields={props.blankFields} />;
  }
  return null;
}

class AddLot extends React.Component {
  state = {
    submitted: false,
    blankFields: '',
    hasError: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () => {
    if (
      this.state.ticker &&
      this.state.boughtShares &&
      this.state.boughtPrice &&
      this.state.date &&
      this.state.broker
    ) {
      return true;
    } else {
      this.setState({
        blankFields: `${this.state.ticker ? '' : 'ticker'} ${
          this.state.boughtShares ? '' : 'boughtShares'
        } ${this.state.boughtPrice ? '' : 'boughtPrice'} ${
          this.state.date ? '' : 'date'
        } ${this.state.broker ? '' : 'broker'}`,
      });

      return false;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const validated = this.validate();

    if (validated) {
      this.setState({ hasError: false });
      this.setState({});
      this.props.submitted(true);
      portfolioUtils.addLotToPortfolio(
        this.state.ticker,
        this.state.boughtShares,
        this.state.boughtPrice,
        this.state.date.toDate(),
        this.state.broker
      );
    } else {
      this.setState({ hasError: true });
      console.error(`missing fields`);
    }
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
          <Error
            hasError={this.state.hasError}
            blankFields={this.state.blankFields}
          />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default AddLot;
