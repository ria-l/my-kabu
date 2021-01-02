import * as dateUtils from './dateUtils';
/**
 *
 * @param {String} ticker
 * @param {Date} date
 * @return {Number} stockPrice
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
  window.localStorage.setItem(storageKey, true);
  const dateFormattedForApi = dateUtils
    .setDateToUtcMidnight(date)
    .toISOString()
    .split('T')[0];
  const pricesApiUrl = `https://fast-spire-77124.herokuapp.com/prices/${ticker}/${dateFormattedForApi}`;
  const pricesResponse = await fetch(pricesApiUrl);
  const pricesJson = await pricesResponse.json();
  const stockPrice = (pricesJson[0] || { close: '' }).close || '';
  window.localStorage.setItem(storageKey, JSON.stringify(stockPrice));
  return stockPrice;
}
