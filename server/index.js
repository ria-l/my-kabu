const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

const tiingo_api_key = process.env.TIINGO_API_KEY;

app.get('/prices/:ticker', async (request, response) => {
  try {
    const startDate = '2020-08-01';
    const endDate = '2020-08-22';
    const ticker = request.params.ticker;
    const apiUrl = `https://api.tiingo.com/tiingo/daily/${ticker}/prices?startDate=${startDate}&endDate=${endDate}&token=${tiingo_api_key}`;
    console.log(apiUrl);
    // const fetchResponse = await fetch(apiUrl);
    // const json = await fetchResponse.json();
    // response.json(json);
  } catch (err) {
    console.error(err);
  }
});

app.get('/meta/:ticker', async (request, response) => {
  const ticker = request.params.ticker;
  const apiUrl = `https://api.tiingo.com/tiingo/daily/${ticker}?token=${tiingo_api_key}`;
  const fetchResponse = await fetch(apiUrl);
  const json = await fetchResponse.json();
  response.json(json);
});

const port = process.env.PORT || 3001;
app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`)
);
