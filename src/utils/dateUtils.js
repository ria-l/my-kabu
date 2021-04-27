import moment from 'moment';

/**
 * Takes two dates and creates an array of all dates
 * between them, inclusive.
 *
 * @param {Object} startDate
 * @param {Object} endDate
 */
export const getDateRange = (startDate, endDate) => {
  const dateRange = [];
  let copyOfStartDate = new Date(startDate);
  let numDates = (endDate - startDate) / (60 * 60 * 24 * 1000);
  for (; numDates >= 0; numDates--) {
    dateRange.push(copyOfStartDate.toISOString());
    copyOfStartDate.setDate(copyOfStartDate.getDate() + 1);
  }
  return dateRange;
};

/**
 * Converts Date objects to match the date picker's
 * format. Basically the date picker just defaults
 * dates to local date, 12pm.
 *
 * @param {Date} date
 */
export const setTimeToNoon = (date) => {
  const dateCopy = new Date(date);
  dateCopy.setHours(12, 0, 0, 0);
  return dateCopy;
};

/**
 * Converts 12pm local Date objects to 12am UTC.
 *
 * The date picker creates Date objects with the time set as 12pm local time.
 * This is incompatible with the stock API, which uses UTC 12am.
 *
 * @param {Date} date Fri May 01 2020 12:00:00 GMT-0700 (Pacific Daylight Time)
 * @returns {Date} 2020-05-01T00:00:00.000Z
 */
export const setDateToUtcMidnight = (date) => {
  const timezoneOffset = date.getTimezoneOffset();
  const newDate = setTimeToNoon(date);
  newDate.setHours(newDate.getHours() - timezoneOffset / 60 - 12);
  return newDate;
};

export const yesterday = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
};
