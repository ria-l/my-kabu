import React, { Component } from 'react';
import './App.css';
import PortfolioSummary from './PortolioSummary';
import StockList from './StockList';
import AddLot from './AddLot';

class App extends Component {
  state = {
    submitted: false,
  };

  setSubmittedState = (state) => {
    this.setState({ submitted: state });
  };

  render() {
    return (
      <>
        <PortfolioSummary />
        <AddLot itsAProp={this.setSubmittedState} />
        <StockList />
      </>
    );
  }
}

export default App;
