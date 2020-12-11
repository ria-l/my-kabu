import * as dateUtils from './dateUtils';
import * as Constants from '../constants';

export function getTodaysPrice(ticker) {
  const today = new Date().toISOString().split('T')[0];
  const tickerData = Constants.API_PRICES[ticker];
  for (const entry in tickerData) {
    const cleanDate = tickerData[entry].date.split('T')[0];

    if (cleanDate === today) {
      return tickerData[entry].adjClose;
    }
  }
}

export function getYesterdaysPrice(ticker) {
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday = yesterday.toISOString().split('T')[0];

  for (const entry in Constants.API_PRICES[ticker]) {
    const cleanDate = Constants.API_PRICES[ticker][entry].date.split('T')[0];
    if (cleanDate === yesterday) {
      return Constants.API_PRICES[ticker][entry].adjClose;
    }
  }
}

/**
 *
 * @param {String} ticker
 * @param {Date} date
 */
export async function getStockPrice(ticker, date) {
  const dateFormattedForApi = dateUtils
    .setDateToUtcMidnight(date)
    .toISOString()
    .split('T')[0];
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
    const copyOfDate = dateUtils.convertPickedDateToUtc(date);
    const apiDate = new Date(pricesJson[i].date);
    if (apiDate.toISOString() === copyOfDate.toISOString()) {
      return pricesJson[i].close;
    }
  }
}
