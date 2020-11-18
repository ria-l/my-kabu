const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build'))); // serves up this

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server ${port}`);
});

// app.use(express.static('/src'));

// // const fetch = require('node-fetch');
// // require('dotenv').config();
// // const tiingo_api_key = process.env.TIINGO_API_KEY;

// // app.get('/prices/:ticker', async (request, response) => {
// //   const startDate = '2020-08-01';
// //   const endDate = '2020-08-22';
// //   const ticker = request.params.ticker;
// //   const apiUrl = `https://api.tiingo.com/tiingo/daily/${ticker}/prices?startDate=${startDate}&endDate=${endDate}&token=${tiingo_api_key}`;
// //   const fetchResponse = await fetch(apiUrl);
// //   const json = await fetchResponse.json();
// //   response.json(json);
// // });

// app.get('/', (req, res) => {
//   // res.send('yo');
// });

// // app.use(express.json({ limit: '1mb' }));

// // // proxy server
// // app.get('/meta/:ticker', async (request, response) => {
// //   const ticker = request.params.ticker;
// //   const apiUrl = `https://api.tiingo.com/tiingo/daily/${ticker}?token=${tiingo_api_key}`;
// //   const fetchResponse = await fetch(apiUrl);
// //   const json = await fetchResponse.json();
// //   response.json(json);
// // });
