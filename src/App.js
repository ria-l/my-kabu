import React, { Component } from 'react';
import '../App.css';
import PortfolioSummary from './PortolioSummary';
import StockList from './StockList';
import TickerPicker from './TickerPicker';
// import Chart from 'chart.js';

import { Button, DatePicker } from 'antd';

// const App = () => (
//   <>
//     <Button type="primary">PRESS ME</Button>
//     <DatePicker placeholder="select date" />
//   </>
// );

class App extends Component {
  // state = {};
  render() {
    return (
      <>
        <PortfolioSummary />
        <StockList />
        <TickerPicker />
      </>
    );
  }
}

export default App;
