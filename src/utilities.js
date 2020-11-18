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

/**
 *
 * @param {Object} startDate
 * @param {Object} endDate
 */
export const prepDataForPortfolioChart = (startDate, endDate) => {
  let portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
  if (!portfolio) {
    return;
  }
  const dateRange = getDateRange(startDate, endDate),
    xAxisLabels = [],
    yAxisLabels = [];
  dateRange.forEach((date) => {
    const dateObject = new Date(date);
    xAxisLabels.push(
      `${dateObject.getFullYear()}-${
        dateObject.getMonth() + 1
      }-${dateObject.getDate()}`
    );
    yAxisLabels.push(getYAxisValue(portfolio, dateObject));
  });
  return { xAxisLabels, yAxisLabels };
};

/**
 *
 * @param {Object} startDate
 * @param {Object} endDate
 */
const getDateRange = (startDate, endDate) => {
  const dateRange = [];
  let copyOfStartDate = new Date(startDate),
    numDates = (endDate - startDate) / (60 * 60 * 24 * 1000);
  for (; numDates >= 0; numDates--) {
    dateRange.push(copyOfStartDate.toISOString());
    copyOfStartDate.setDate(copyOfStartDate.getDate() + 1);
  }
  return dateRange;
};

const getYAxisValue = (portfolio, dateObject) => {
  let yValue = 0;
  for (const lotIndex in portfolio.lots) {
    const boughtDate = new Date(portfolio.lots[lotIndex].boughtDate);
    const dateIsInRange = boughtDate <= dateObject;
    const numShares = portfolio.lots[lotIndex].boughtShares;

    if (dateIsInRange) {
      const price = getStockPrice(portfolio.lots[lotIndex].symbol, dateObject);
      yValue += price * numShares;
    }
  }
  return yValue;
};

/**
 *
 * @param {String} ticker
 * @param {Object} date
 */
const getStockPrice = (ticker, date) => {
  const pricesJson = Constants.API_PRICES[ticker];
  if (!pricesJson) {
    return;
  }

  for (let i = 0; i < pricesJson.length; i++) {
    const copyOfDate = convertPickedDateToUtc(date);
    const apiDate = new Date(pricesJson[i].date);
    if ((apiDate, apiDate.toISOString() === copyOfDate.toISOString())) {
      return pricesJson[i].close;
    }
  }
};

/**
 * Converts Date object from the date picker to UTC,
 * in order to be compatible with dates sent by the API.
 *
 * Date picker uses local date, 12pm:
 * Fri May 01 2020 12:00:00 GMT-0700 (Pacific Daylight Time)
 * The data's date is UTC 12am: 2020-05-01T00:00:00.000Z
 *
 * @param {Object} date
 */
const convertPickedDateToUtc = (date) => {
  const timezoneOffset = date.getTimezoneOffset();
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() - timezoneOffset / 60 - 12);
  return newDate;
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

export function getNumberOfShares(index) {
  const portfolio = window.localStorage.getItem('portfolio');
  if (portfolio) {
    const portfolioEntry = JSON.parse(portfolio).lots[index];
    return portfolioEntry.boughtShares - portfolioEntry.soldShares;
  }
  return 0;
}
