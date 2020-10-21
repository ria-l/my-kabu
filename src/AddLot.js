import React from 'react';
import * as Utilities from './utilities';

class AddLot extends React.Component {
  state = { tickerValue: null, boughtShares: null, submitted: false };

  handleTickerChange = (event) => {
    this.setState({ tickerValue: event.target.value });
  };

  handleSharesChange = (event) => {
    this.setState({ boughtShares: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitted(true);
    Utilities.addLotToPortfolio(
      this.state.tickerValue,
      this.state.boughtShares
    );
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h2>What did you buy??</h2>
          <label>
            Stock:
            <input
              value={this.state.tickerValue}
              onChange={this.handleTickerChange}
            />
            <br />
            <label>
              Number of shares:
              <input
                value={this.state.boughtShares}
                onChange={this.handleSharesChange}
              />
            </label>
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.props.submitted && <h1>{this.state.value}</h1>}
      </>
    );
  }
}

export default AddLot;
