import * as Constants from './constants';
import { v4 as uuidv4 } from 'uuid';

export function addLotToPortfolio(ticker, boughtShares) {
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
      boughtDate: null,
      broker: null,
      boughtPrice: null,
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

// TODO: need to convert this to sum values
export const getDataForChart = (ticker) => {
  const pricesJson = Constants.API_PRICES[ticker];
  if (pricesJson) {
    const xAxisLabels = [];
    const yAxisLabels = [];

    for (let i = 0; i < pricesJson.length; i++) {
      xAxisLabels.push(pricesJson[i].date.split('T')[0]);
      yAxisLabels.push(pricesJson[i].close);
    }

    const metaData = Constants.API_META[ticker];
    const name = metaData['name'];

    return { xAxisLabels, yAxisLabels, name };
  } else {
    return null;
  }
};

export function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

/**
 *
 * @param {string} ticker
 */
export function getTodaysPrice(ticker) {
  let today = formatDate(new Date());
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
  let yesterday = new Date();
  yesterday = yesterday.setDate(yesterday.getDate() - 1);
  yesterday = formatDate(yesterday);
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
    return portfolioEntry.buyShares - portfolioEntry.sellShares;
  }
  return 0;
}
