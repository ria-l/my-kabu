import React from 'react';
import * as Utilities from './utilities';

class AddLot extends React.Component {
  state = {
    tickerValue: null,
    boughtShares: null,
    boughtPrice: null,
    broker: null,
    submitted: false,
  };

  handleTickerChange = (event) => {
    this.setState({ tickerValue: event.target.value });
  };
  handleSharesChange = (event) => {
    this.setState({ boughtShares: event.target.value });
  };
  handlePriceChange = (event) => {
    this.setState({ boughtPrice: event.target.value });
  };
  handleDateChange = (event) => {
    this.setState({ boughDate: event.target.value });
  };
  handleBrokerChange = (event) => {
    this.setState({ broker: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitted(true);
    Utilities.addLotToPortfolio(
      this.state.tickerValue,
      this.state.boughtShares,
      this.state.boughtDate,
      this.state.broker
    );
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <h2>What did you buy??</h2>
          <label>Stock:</label>
          <input
            value={this.state.tickerValue}
            onChange={this.handleTickerChange}
          />
          <br />
          <label>Number of shares:</label>
          <input
            value={this.state.boughtShares}
            onChange={this.handleSharesChange}
          />
          <br />
          <label>Buy price: </label>
          <input
            value={this.state.boughtPrice}
            onChange={this.handlePriceChange}
          />
          <br />
          <label>Buy date: </label>
          <input
            value={this.state.boughtDatePrice}
            onChange={this.handleDateChange}
          />
          <br />
          <label>Broker: </label>
          <input
            value={this.state.broker}
            onChange={this.handlBrokerChange}
          />
          <input type="submit" value="Submit" />
        </form>
        {this.props.submitted && <h1>{this.state.value}</h1>}
      </>
    );
  }
}

export default AddLot;
