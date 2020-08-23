document.querySelector('#submit').addEventListener('click', () => {
  // getTiingo();
  chartIt();
});

async function getTiingo() {
  const tick = document.querySelector('#ticker').value.toUpperCase();
  const api_url = `/ticker/${tick}`;
  const response = await fetch(api_url);
  const json = await response.json();

  console.log(json);
  const root = document.querySelector('#ticker-info');

root.textContent=''
  for (const property in json) {
    const p = document.createElement('p');

    if (property == 'detail') {
      p.textContent = `Ticker "${tick}" not found.`;
      root.append(p);
    } else {
      p.textContent = `${property}: ${json[property]}`;
      root.append(p);
    }
  }
  
  
  // dailies
  const api_daily_url = `/daily/${tick}`;
  const response_daily = await fetch(api_daily_url);
  const json_daily = await response_daily.json();
  const xAxis = [];
  const yAxis = [];
  json_daily.forEach((e) => {
    xAxis.push(e.date.split('T')[0]);
    yAxis.push(e.close);
  });
  return {xAxis, yAxis};
};


async function chartIt() {
  const json = await getTiingo();

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: json.xAxis,
      datasets: [{
        label: '$$',
        data: json.yAxis,
        backgroundColor: ['rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255, 159, 64, 1)'],
        borderWidth: 1,
        lineTension: 0
      }]
    },
    options: {
      responsive: true,
      // maintainAspectRatio: true
    }
  });
}

// async function getData() {
//   const response = await fetch('/api');
//   const data = await response.json();
// }
// getData();
