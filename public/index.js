document.querySelector('#submit').addEventListener('click', () => {
  chartIt();
});

async function chartIt() {
  const tiingoData = await getTiingo();
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: tiingoData.xAxisLabels,
      datasets: [
        {
          label: `${tiingoData.ticker}: ${tiingoData.name}`,
          data: tiingoData.yAxisLabels,
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

async function getTiingo() {
  const ticker = document.querySelector('#ticker').value.toUpperCase();
  const metadataApiUrl = `/ticker/${ticker}`;
  const metadataResponse = await fetch(metadataApiUrl);
  const metadataJson = await metadataResponse.json();

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
  const { name } = metadataJson;

  const dailyApiUrl = `/daily/${ticker}`;
  const dailyResponse = await fetch(dailyApiUrl);
  const dailyJson = await dailyResponse.json();
  const xAxisLabels = [];
  const yAxisLabels = [];
  dailyJson.forEach((e) => {
    xAxisLabels.push(e.date.split('T')[0]);
    yAxisLabels.push(e.close);
  });

  return { xAxisLabels, yAxisLabels, ticker, name };
}
