import * as Constants from './constants';
import { v4 as uuidv4 } from 'uuid';

export const falseFunc = () => false;

export const getToday = () => {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  return today;
};

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
export const prepDataForPortfolioChart = async (startDate, endDate) => {
  let portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
  if (!portfolio) {
    return;
  }
  const dateRange = getDateRange(startDate, endDate);
  const xAxisLabels = [];
  const yAxisLabels = [];
  const promises = [];
  dateRange.forEach((date) => {
    const dateObject = new Date(date);
    promises.push(
      new Promise(async (resolve) =>
        resolve(await getYAxisValue(portfolio, dateObject))
      )
    );
  });
  const promiseArray = await Promise.all(promises);
  dateRange.forEach((date, i) => {
    const dateObject = new Date(date);
    const dateTwo = ('0' + dateObject.getDate()).substr(-2);
    const monthTwo = ('0' + (dateObject.getMonth() + 1)).substr(-2);
    const yValue = promiseArray[i];
    if (!isNaN(yValue)) {
      yAxisLabels.push(yValue);
      xAxisLabels.push(`${dateObject.getFullYear()}-${monthTwo}-${dateTwo}`);
    }
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
  let copyOfStartDate = new Date(startDate);
  let numDates = (endDate - startDate) / (60 * 60 * 24 * 1000);
  for (; numDates >= 0; numDates--) {
    dateRange.push(copyOfStartDate.toISOString());
    copyOfStartDate.setDate(copyOfStartDate.getDate() + 1);
  }
  return dateRange;
};

export const getYAxisValue = async (portfolio, dateObject) => {
  let yValue = 0;
  const promises = [];
  const numArr = [];

  for (const lotIndex in portfolio.lots) {
    const boughtDate = new Date(portfolio.lots[lotIndex].boughtDate);
    const dateIsInRange = boughtDate <= dateObject;
    const numShares = portfolio.lots[lotIndex].boughtShares;

    if (dateIsInRange) {
      const stockPromise = new Promise(async (resolve, reject) => {
        const stockPrice = await getStockPrice(
          portfolio.lots[lotIndex].symbol,
          dateObject
        );
        resolve(stockPrice);
      });

      promises.push(stockPromise); // stockPromise is a promise, that resolves to thet stock price
      numArr.push(numShares);
    }
  }
  const resolvedJunk = await Promise.all(promises); // this is an object that contains the resolution of all the promises
  for (let i = 0; i < resolvedJunk.length; i++) {
    yValue += resolvedJunk[i] * numArr[i];
  }
  return yValue;
};

/**
 *
 * @param {String} ticker
 * @param {Object} date
 */
async function getStockPrice(ticker, date) {
  const apiDate = convertPickedDateToUtc(date).toISOString().split('T')[0];
  const pricesApiUrl = `/prices/${ticker}/${apiDate}`;
  const pricesResponse = await fetch(pricesApiUrl);
  const pricesJson = await pricesResponse.json();

  // If ticker is invalid
  if (pricesJson['detail']) {
    // TODO: should not return an object from this function
    console.error(`Invalid ticker ${ticker}`);
    return {
      xAxisLabels: [],
      yAxisLabels: [],
      name: `Invalid ticker ${ticker}`,
    };
  }
  if (!pricesJson) {
    return;
  }

  for (let i = 0; i < pricesJson.length; i++) {
    const copyOfDate = convertPickedDateToUtc(date);
    const apiDate = new Date(pricesJson[i].date);
    if (apiDate.toISOString() === copyOfDate.toISOString()) {
      return pricesJson[i].close;
    }
  }
}

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
