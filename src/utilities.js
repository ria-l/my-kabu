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

export const getStockPrice = (ticker, date) => {
  const pricesJson = Constants.API_PRICES[ticker];
  if (!pricesJson) {
    return;
  }
  let apiDate;
  for (let i = 0; i < pricesJson.length; i++) {
    apiDate = convertToUtc(pricesJson[i].date);
    if ((apiDate, apiDate.toISOString() === date.toISOString())) {
      return pricesJson[i].close;
    }
  }
};

/**
 *
 * @param {Object|string} date
 */
export const convertToUtc = (date) => {
  const dateObject = new Date(date);
  const convertedDate = new Date(
    Date.UTC(
      dateObject.getUTCFullYear(),
      dateObject.getUTCMonth(),
      dateObject.getUTCDate(),
      0,
      0,
      0
    )
  );
  return convertedDate;
};
// // for console testing:
// api = new Date('2020-11-29T00:00:00.000Z');
// bnb = new Date('Sun Nov 29 2020 12:00:00 GMT-0800 (Pacific Standard Time)');
// convertToUtc(bnb);

export const prepareDataForPortfolioChart = (startDate, endDate) => {
  console.log('prepareDataForPortfolioChart');
  let portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
  if (!portfolio) {
    return;
  }
  let copyOfStartDate = new Date(startDate),
    numDates = (endDate - startDate) / (60 * 60 * 24 * 1000);
  const xAxisLabels = [],
    yAxisLabels = [],
    dateRange = [];
  // pushes range of dates into array
  for (; numDates >= 0; numDates--) {
    dateRange.push(copyOfStartDate.toISOString());
    copyOfStartDate.setDate(copyOfStartDate.getDate() + 1);
  }

  copyOfStartDate = convertToUtc(copyOfStartDate);
  let dateIsInRange;
  let boughtDate;
  let dateObject;
  dateRange.forEach((date) => {
    dateObject = convertToUtc(date);
    let yValue = 0;
    for (const lotIndex in portfolio.lots) {
      boughtDate = new Date(portfolio.lots[lotIndex].boughtDate);
      dateIsInRange = boughtDate <= dateObject;
      let price;
      let numShares = portfolio.lots[lotIndex].boughtShares;
      if (dateIsInRange) {
        price = getStockPrice(portfolio.lots[lotIndex].symbol, dateObject);
        console.log(
          portfolio.lots[lotIndex].symbol,
          dateObject,
          price,
          numShares,
          price * numShares
        );
        yValue += price * numShares;
      }
    }
    yAxisLabels.push(yValue);
    xAxisLabels.push(`${date}`);
  });

  console.log('dateRange', dateRange);
  console.log('xAxisLabels', xAxisLabels);
  console.log('yAxisLabels', yAxisLabels);
  // return { xAxisLabels, yAxisLabels };
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
