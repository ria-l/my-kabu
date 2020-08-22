document.querySelector('#submit').addEventListener('click', () => {
  getTiingo();

});

async function getTiingo() {

  const tick = document.querySelector('#ticker').value.toUpperCase();
  const api_url = `/ticker/${tick}`;
  const response = await fetch(api_url);
  const json = await response.json();

  console.log(json);
  const root = document.createElement('div');
  document.body.append(root);
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
  const hr = document.createElement('hr');
  root.append(hr);


  // chart it
  const api_daily_url = `/daily/${tick}`;
  const response_daily = await fetch(api_daily_url);
  const json_daily = await response_daily.json();

  console.log(json_daily);
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [json_daily[0].date],
      datasets: [{
        label: '$$',
        data: [json_daily[0].close],
        backgroundColor: ['rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255, 159, 64, 1)'],
        borderWidth: 1,
        lineTension: 0
      }]
    },
  });
};

// async function getData() {
//   const response = await fetch('/api');
//   const data = await response.json();
// }
// getData();
