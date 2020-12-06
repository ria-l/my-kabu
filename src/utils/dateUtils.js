export const getToday = () => {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  return today;
};

/**
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

export function getTodaysDateInIso() {
  const today = new Date().toISOString();
  return today;
}

export function getYesterdaysDateInIso() {
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday = yesterday.toISOString();
  return yesterday;
}
