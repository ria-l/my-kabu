import * as DateUtils from './dateUtils';
import * as ApiCalls from './apiCalls';

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
  const dateRange = DateUtils.getDateRange(startDate, endDate);
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
        const stockPrice = await ApiCalls.getStockPrice(
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
