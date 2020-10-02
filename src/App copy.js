import React, { Component } from 'react';
import '../App.css';
import Chart from 'chart.js';
import TickerPicker from './TickerPicker';
import * as Constants from './Const';

const getDataForChart = () => {
  const pricesJson = Constants.FAKE_PRICES;
  const xAxisLabels = [];
  const yAxisLabels = [];
  for (let i = 0; i < pricesJson.length; i++) {
    xAxisLabels.push(pricesJson[i].date.split('T')[0]);
    yAxisLabels.push(pricesJson[i].close);
  }

  const metaData = Constants.FAKE_META;
  const name = metaData['name'];

  return { xAxisLabels, yAxisLabels, name };
};

class App extends Component {
  chartRef = React.createRef();
  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext('2d');
    const chartData = getDataForChart();
    new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: chartData.xAxisLabels,
        datasets: [
          {
            label: `${chartData.ticker}: ${chartData.name}`,
            data: chartData.yAxisLabels,
            backgroundColor: ['rgba(0, 200, 5, 0.2)'],
            borderColor: ['rgba(0, 200, 5, 1)'],
            borderWidth: 1,
            lineTension: 0,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
  render() {
    return (
      <div className="App">
        <div id="input-wrapper">
          <TickerPicker />
        </div>
        <div id="chart-wrapper">
          <canvas id="myChart" ref={this.chartRef} width="6" height="4" />
        </div>
        <div id="ticker-info"></div>
      </div>
    );
  }
}

export default App;
export { getDataForChart };
