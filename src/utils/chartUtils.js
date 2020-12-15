import moment from 'moment';
import * as dateUtils from './dateUtils';
import * as apiCalls from './apiCalls';

/**
 * @param {Date} startDate
 * @param {Date} endDate
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
  let prevValue = 0;

  dateRange.forEach((date, i) => {
    const yValue = promiseArray[i];

    if (!isNaN(yValue)) {
      yAxisLabels.push(yValue);
      prevValue = yValue;
    } else {
      yAxisLabels.push(prevValue);
    }
    xAxisLabels.push(moment(date).format('YYYY-MM-DD'));
  });

  return { xAxisLabels, yAxisLabels };
};

/**
 * @param {Object} portfolio
 * @param {Date} dateObject
 */
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

      promises.push(stockPromise);
      numArr.push(numShares);
    }
  }
  const resolvedJunk = await Promise.all(promises);

  for (let i = 0; i < resolvedJunk.length; i++) {
    yValue += resolvedJunk[i] * numArr[i];
  }

  return yValue;
};
