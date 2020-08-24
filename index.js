const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const tiingo_api_key = process.env.TIINGO_API_KEY;
const app = express();
app.listen(8080, () => {
  console.log('listening...');
});
app.use(express.static('./public'));
app.use(express.json({ limit: '1mb' }));

// proxy server
app.get('/ticker/:ticker', async (request, response) => {
  const ticker = request.params.ticker;
  const apiUrl = `https://api.tiingo.com/tiingo/daily/${ticker}?token=${tiingo_api_key}`;
  const response = await fetch(apiUrl);
  const json = await response.json();
  response.json(json);
});

app.get('/daily/:ticker', async (request, response) => {
  const startDate = '2020-08-01';
  const endDate = '2020-08-22';
  const ticker = request.params.ticker;
  const apiUrl = `https://api.tiingo.com/tiingo/daily/${ticker}/prices?startDate=${startDate}&endDate=${endDate}&token=${tiingo_api_key}`;
  const response = await fetch(apiUrl);
  const json = await response.json();
  response.json(json);
});
