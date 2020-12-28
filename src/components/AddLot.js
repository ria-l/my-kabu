import React from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import * as utilities from '../utils/utilities';
import * as portfolioUtils from '../utils/portfolioUtils';

function Error(props) {
  const hasError = props.hasError;
  if (hasError) {
    return <MissingFields errorMsg={props.errorMsg} />;
  }
  return null;
}

function MissingFields(props) {
  return (
    <div className="error">
      Fill in all required fields.
      <br />
      Missing: {props.errorMsg}
    </div>
  );
}

const fieldLabels = {
  ticker: 'Symbol',
  boughtShares: 'Number of Shares',
  boughtPrice: 'Buy Price',
  date: 'Date',
  broker: 'Broker',
};

class AddLot extends React.Component {
  state = {
    submitted: false,
    fieldValues: {
      ticker: undefined,
      boughtShares: undefined,
      boughtPrice: undefined,
      date: undefined,
      broker: undefined,
    },
    hasError: false,
  };

  handleChange = (e) => {
    this.setState({
      fieldValues: {
        ...this.state.fieldValues,
        [e.target.name]: e.target.value,
      },
    });
  };

  validateFields = () => {
    if (
      this.state.fieldValues.ticker &&
      this.state.fieldValues.boughtShares &&
      this.state.fieldValues.boughtPrice &&
      this.state.fieldValues.date &&
      this.state.fieldValues.broker
    ) {
      return true;
    }
    return false;
  };

  setErrorMsg() {
    let msg = '';
    for (let [field, value] of Object.entries(this.state.fieldValues)) {
      if (!value) {
        msg += `${fieldLabels[field]}, `;
      }
    }
    this.setState({
      errorMsg: msg,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validateFields()) {
      this.setState({ hasError: false });
      this.props.submitted(true);
      portfolioUtils.addLotToPortfolio(
        this.state.fieldValues.ticker,
        this.state.fieldValues.boughtShares,
        this.state.fieldValues.boughtPrice,
        this.state.fieldValues.date.toDate(),
        this.state.fieldValues.broker
      );
    } else {
      this.setState({ hasError: true });
      this.setErrorMsg();
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h2>Add a new lot</h2>
          <label
            className={
              !this.state.fieldValues.ticker && this.state.hasError
                ? 'error'
                : 'default'
            }
          >
            Ticker:{' '}
          </label>
          <input
            name="ticker"
            onChange={this.handleChange}
            value={this.state.fieldValues.ticker || ''}
          />
          <br />
          <label
            className={
              !this.state.fieldValues.boughtShares && this.state.hasError
                ? 'error'
                : 'default'
            }
          >
            Number of shares:{' '}
          </label>
          <input
            name="boughtShares"
            onChange={this.handleChange}
            value={this.state.fieldValues.boughtShares || ''}
          />
          <br />
          <label
            className={
              !this.state.fieldValues.boughtPrice && this.state.hasError
                ? 'error'
                : 'default'
            }
          >
            Buy price:{' '}
          </label>
          <input
            name="boughtPrice"
            onChange={this.handleChange}
            value={this.state.fieldValues.boughtPrice || ''}
          />
          <br />
          <label
            className={
              !this.state.fieldValues.date && this.state.hasError
                ? 'error'
                : 'default'
            }
          >
            Buy date:{' '}
          </label>
          <SingleDatePicker
            date={this.state.fieldValues.date}
            onDateChange={(date) =>
              this.setState({
                fieldValues: { ...this.state.fieldValues, date },
              })
            }
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            id="your_unique_id"
            isOutsideRange={utilities.falseFunc}
          />
          <br />
          <label
            className={
              !this.state.fieldValues.broker && this.state.hasError
                ? 'error'
                : 'default'
            }
          >
            Broker:{' '}
          </label>
          <input
            name="broker"
            onChange={this.handleChange}
            value={this.state.fieldValues.broker || ''}
          />
          <Error
            hasError={this.state.hasError}
            errorMsg={this.state.errorMsg}
          />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default AddLot;
