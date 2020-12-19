import * as dateUtils from './dateUtils';

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
  const pricesApiUrl = `/prices/${ticker}/${dateFormattedForApi}`;
  const pricesResponse = await fetch(pricesApiUrl);
  const pricesJson = await pricesResponse.json();

  // If ticker is invalid
  if (pricesJson['detail']) {
    console.error(`Invalid ticker ${ticker}`);
    return undefined;
  } else if (!pricesJson || pricesJson.length === 0) {
    console.error('no data was fetched')
    return undefined;
  } else {
    const d = dateUtils.setDateToUtcMidnight(date);
    const fetchedDate = new Date(pricesJson[0].date);
    if (fetchedDate.toISOString() === d.toISOString()) {
      return pricesJson[0].close;
    } else {
      console.error(`${fetchedDate.toISOString()} != ${d.toISOString()}`);
    }
  }
}
