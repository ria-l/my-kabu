import * as Constants from './constants';
import { v4 as uuidv4 } from 'uuid';

export const falseFunc = () => false;
export function addLotToPortfolio(
  ticker,
  boughtShares,
  boughtPrice,
  boughtDate,
  broker
) {
  if (ticker) {
    let portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    if (!portfolio) {
      window.localStorage.setItem(
        'portfolio',
        JSON.stringify({
          name: 'To The Moon',
          lots: [],
        })
      );
      portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    }
    portfolio.lots.push({
      id: uuidv4(),
      symbol: ticker.toUpperCase(),
      boughtShares,
      boughtDate,
      boughtPrice,
      broker,
      soldShares: 0,
      soldDate: null,
      soldPrice: null,
    });
    window.localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }
}

export function deleteLotFromPortfolio(id) {
  let portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
  if (portfolio) {
    let index;
    for (let i = 0; i < portfolio.lots.length; i++) {
      if (id === portfolio.lots[i]['id']) {
        index = i;
      }
    }
    if (index >= 0) {
      portfolio.lots.splice(index, 1);
      window.localStorage.setItem('portfolio', JSON.stringify(portfolio));
    }
  }
}

export function updatePortfolio(id, symbol, boughtShares) {
  let portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
  if (portfolio) {
    let index;
    for (let i = 0; i < portfolio.lots.length; i++) {
      if (id === portfolio.lots[i]['id']) {
        index = i;
      }
    }
    if (index >= 0) {
      if (symbol) {
        portfolio.lots[index].symbol = symbol;
      }
      if (boughtShares) {
        portfolio.lots[index].boughtShares = boughtShares;
      }
      window.localStorage.setItem('portfolio', JSON.stringify(portfolio));
    }
  }
}

export const getDataForChart = (ticker) => {
  const pricesJson = Constants.API_PRICES[ticker];
  if (!pricesJson) {
    return;
  }
  const xAxisLabels = [];
  const yAxisLabels = [];

  for (let i = 0; i < pricesJson.length; i++) {
    xAxisLabels.push(pricesJson[i].date.split('T')[0]);
    yAxisLabels.push(pricesJson[i].close);
  }

  const metaData = Constants.API_META[ticker];
  const name = metaData['name'];

  return { xAxisLabels, yAxisLabels, name };
};

export function getTodaysDateInIso() {
  const today = new Date().toISOString();
  return today;
}

export function getYesterdaysDateInIso() {
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday = yesterday.toISOString();
  return yesterday;
}
/**
 *
 * @param {string} ticker
 */
export function getTodaysPrice(ticker) {
  const today = getTodaysDateInIso().split('T')[0];
  const tickerData = Constants.API_PRICES[ticker];
  for (const entry in tickerData) {
    const cleanDate = tickerData[entry].date.split('T')[0];

    if (cleanDate === today) {
      return tickerData[entry].adjClose;
    }
  }
}

/**
 *
 * @param {string} ticker
 */
export function getYesterdaysPrice(ticker) {
  const yesterday = getYesterdaysDateInIso().split('T')[0];
  for (const entry in Constants.API_PRICES[ticker]) {
    const cleanDate = Constants.API_PRICES[ticker][entry].date.split('T')[0];
    if (cleanDate === yesterday) {
      return Constants.API_PRICES[ticker][entry].adjClose;
    }
  }
}

/**
 *
 * @param {number} oldValue
 * @param {number} newValue
 */
export function calculatePercentChange(oldValue, newValue) {
  if (oldValue && newValue) {
    return (((newValue - oldValue) / oldValue) * 100).toFixed(2) + '%';
  } else {
    return null;
  }
}

/**
 *
 * @param {number} lot
 */
export function getNumberOfShares(lot) {
  const portfolio = window.localStorage.getItem('portfolio');
  if (portfolio) {
    const portfolioEntry = JSON.parse(portfolio).lots[lot];
    return portfolioEntry.boughtShares - portfolioEntry.soldShares;
  }
  return 0;
}
