const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

const tiingo_api_key = process.env.TIINGO_API_KEY;
const app = express();
app.listen(8080, () => { console.log('listening...'); });
app.use(express.static('./public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data); // sends data back to client
});

// proxy server
app.get('/ticker/:ticker', async (request, response) => {
  const ticker = request.params.ticker;
  const api_url = `https://api.tiingo.com/tiingo/daily/${ticker}?token=${tiingo_api_key}`;
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);
});

app.get('/daily/:ticker', async (request, response) => {
  const startDate = '2020-08-01';
  const endDate = '2020-08-22';
  const ticker = request.params.ticker;
  const api_url = `https://api.tiingo.com/tiingo/daily/${ticker}/prices?startDate=${startDate}&endDate=${endDate}&token=${tiingo_api_key}`;
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);
});