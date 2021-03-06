import * as dateUtils from './dateUtils';

/**
 *
 * @param {String} ticker
 * @param {Date} date
 * @return {Number} stockPrice
 */
export async function getLastValidPrice(ticker, date) {
  let price = 0;
  for (let i = 0; i < 5; i++) {
    price = await getStockPrice(ticker, date);
    if (!price) {
      date.setDate(date.getDate() - 1);
    } else {
      return price;
    }
  }
}

/**
 *
 * @param {String} ticker
 * @param {Date} date
 * @return {Number} stockPrice
 *
 * https://fast-spire-77124.herokuapp.com/prices/IBM/2021-03-30
 * returns:
 *
 * [{"date":"2021-03-30T00:00:00.000Z","close":134.72,"high":136.27,"low":134.02,"open":135.86, "volume":4790366,"adjClose":134.72,"adjHigh":136.27,"adjLow":134.02,"adjOpen":135.86, "adjVolume":4790366,"divCash":0,"splitFactor":1}]
 *
 * returns [] if it’s a non-trading day.
 */
export async function getStockPrice(ticker, date) {
  const isoDate = dateUtils.setDateToUtcMidnight(date).toISOString();
  const storageKey = `${ticker}-${isoDate}`;
  const storedValue = JSON.parse(window.localStorage.getItem(storageKey));
  /*
   * Cannot use `if(!storedValue)` here, since `localstorage.getItem()`
   * returns `null` if there is not a key/value set, in which case,
   * the default case needs to run.
   */
  if (storedValue === '') {
    return 0;
  } else if (storedValue) {
    return storedValue;
  }
  const dateFormattedForApi = dateUtils
    .setDateToUtcMidnight(date)
    .toISOString()
    .split('T')[0];
  const apiUrl = `https://fast-spire-77124.herokuapp.com/prices/${ticker}/${dateFormattedForApi}`;
  const response = await fetch(apiUrl);
  const json = await response.json();
  const stockPrice = (json[0] || { close: '' }).close || '';
  window.localStorage.setItem(storageKey, JSON.stringify(stockPrice));
  return stockPrice;
}

export async function getStockMetadata(ticker) {
  const storageKey = `${ticker}`;
  const storedValue = JSON.parse(window.localStorage.getItem(storageKey));
  /*
   * Cannot use `if(!storedValue)` here, since `localstorage.getItem()`
   * returns `null` if there is not a key/value set, in which case,
   * the default case needs to run.
   */
  if (storedValue === 'invalid') {
    return false;
  } else if (storedValue === 'valid') {
    return true;
  }
  window.localStorage.setItem(storageKey, undefined);

  const apiUrl = `https://fast-spire-77124.herokuapp.com/meta/${ticker}`;
  const response = await fetch(apiUrl);
  const json = await response.text();
  window.localStorage.setItem(storageKey, JSON.stringify(json));
  return json;
}
