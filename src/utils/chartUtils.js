import moment from 'moment';
import * as dateUtils from './dateUtils';
import * as apiCalls from './apiCalls';

/**
 * @param {Date} startDate
 * @param {Date} endDate
 */
export const getChartLabels = async (startDate, endDate) => {
  const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
  if (!portfolio) {
    return;
  }

  const dateRange = dateUtils.getDateRange(startDate, endDate);
  const promises = await fillPortfolioValuePromises(dateRange, portfolio);
  const portfolioValues = await Promise.all(promises);
  const { xAxisLabels, dataPoints } = fillChartLabels(
    dateRange,
    portfolioValues
  );
  return { xAxisLabels, dataPoints };
};

/**
 * @param {Object} portfolio
 * @param {Date} dateObject
 */
export const getPortfolioValue = async (portfolio, dateObject) => {
  let portfolioValue = 0;
  const promises = [];
  const boughtShares = [];
  for (const lotIndex in portfolio.lots) {
    const boughtDate = new Date(portfolio.lots[lotIndex].boughtDate);
    const dateIsInRange = boughtDate <= dateObject;
    if (dateIsInRange) {
      const stockPrices = new Promise(async (resolve, reject) => {
        const stockPrice = await apiCalls.getStockPrice(
          portfolio.lots[lotIndex].ticker,
          dateObject
        );
        resolve(stockPrice);
      });
      promises.push(stockPrices);
      boughtShares.push(portfolio.lots[lotIndex].boughtShares);
    }
  }
  const stockPrices = await Promise.all(promises);
  for (const [i, price] of stockPrices.entries()) {
    if (!isNaN(price)) {
      portfolioValue += price * boughtShares[i];
    }
  }
  return Math.round(portfolioValue * 100 + Number.EPSILON) / 100;
};

function fillChartLabels(dateRange, portfolioValues) {
  let prevValue = 0;
  const xAxisLabels = [];
  const dataPoints = [];
  dateRange.forEach((date, i) => {
    const value = portfolioValues[i];
    if (!isNaN(value)) {
      dataPoints.push(value);
      prevValue = value;
    } else {
      dataPoints.push(prevValue);
    }
    xAxisLabels.push(moment(date).format('YYYY-MM-DD'));
  });
  return { xAxisLabels, dataPoints };
}

export const fillPortfolioValuePromises = async (dateRange, portfolio) => {
  const promises = [];

  dateRange.forEach((date) => {
    const dateObject = new Date(date);
    promises.push(
      new Promise(async (resolve) =>
        resolve(await getPortfolioValue(portfolio, dateObject))
      )
    );
  });
  return promises;
};
