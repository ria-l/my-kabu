import moment from 'moment';
import * as dateUtils from './dateUtils';
import * as apiCalls from './apiCalls';

/**
 *
 * @param {Object} startDate
 * @param {Object} endDate
 */
export const getChartLabels = async (startDate, endDate) => {
  let portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
  if (!portfolio) {
    return;
  }
  const dateRange = dateUtils.getDateRange(startDate, endDate);
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
    const yValue = promiseArray[i];
    if (!isNaN(yValue)) {
      yAxisLabels.push(yValue);
      xAxisLabels.push(moment(date).format('YYYY-MM-DD'));
    }
  });

  return { xAxisLabels, yAxisLabels };
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
        const stockPrice = await apiCalls.getStockPrice(
          portfolio.lots[lotIndex].ticker,
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
