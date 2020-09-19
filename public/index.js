'use strict';

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#submit').addEventListener('click', () => {
    const ticker = document.querySelector('#ticker').value.toUpperCase();
    chartIt(ticker);
    renderStockMetadata(ticker);
  });
});

async function chartIt(ticker) {
  const chartData = await getDataForChart(ticker);
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
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

async function getDataForChart(ticker) {
  const pricesApiUrl = `/prices/${ticker}`;
  const pricesResponse = await fetch(pricesApiUrl);
  const pricesJson = await pricesResponse.json();
  const xAxisLabels = [];
  const yAxisLabels = [];
  for (let i = 0; i < pricesJson.length; i++) {
    xAxisLabels.push(pricesJson[i].date.split('T')[0]);
    yAxisLabels.push(pricesJson[i].close);
  }

  const metaData = await getStockMetadata(ticker);
  const name = metaData['name'];

  return { xAxisLabels, yAxisLabels, ticker, name };
}

async function getStockMetadata(ticker) {
  const metadataApiUrl = `/meta/${ticker}`;
  const metadataResponse = await fetch(metadataApiUrl);
  const metadataJson = await metadataResponse.json();

  return metadataJson;
}

async function renderStockMetadata(ticker) {
  const metadataJson = await getStockMetadata(ticker);
  const root = document.querySelector('#ticker-info');
  root.textContent = '';
  for (const property in metadataJson) {
    const p = document.createElement('p');
    if (property === 'detail') {
      p.textContent = `Ticker "${ticker}" not found.`;
      root.append(p);
    } else {
      p.textContent = `${property}: ${metadataJson[property]}`;
      root.append(p);
    }
  }
}

module.exports = getDataForChart;
