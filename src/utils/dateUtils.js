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
 * @param {Object} date
 */
export const convertToPickedDate = (date) => {
  date.setHours(12, 0, 0, 0);
  return date;
};

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
export const convertPickedDateToUtc = (date) => {
  const timezoneOffset = date.getTimezoneOffset();
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() - timezoneOffset / 60 - 12);
  return newDate;
};
