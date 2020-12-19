export const falseFunc = () => false;
export const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));

/**
 *
 * @param {number} oldValue
 * @param {number} newValue
 */
export function calculatePercentChange(oldValue, newValue) {
  if (oldValue && newValue) {
    return (((newValue - oldValue) / oldValue) * 100).toFixed(2) + '%';
  } else {
    return null;
  }
}

export function getNumberOfShares(index) {
  if (portfolio) {
    const portfolioEntry = portfolio.lots[index];
    return portfolioEntry.boughtShares - portfolioEntry.soldShares;
  }
  return 0;
}
