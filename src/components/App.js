import React, { Component } from 'react';
import '../css/App.css';
import PortfolioSummary from './PortfolioSummary';
import StockList from './StockList';
import AddLot from './AddLot';

class App extends Component {
  state = {};

  rerender = () => {
    this.setState({ rerender: true });
  };

  render() {
    return (
      <>
        <PortfolioSummary rerender={this.rerender} />
        <AddLot rerender={this.rerender} />
        <StockList rerender={this.rerender} />
      </>
    );
  }
}

export default App;
