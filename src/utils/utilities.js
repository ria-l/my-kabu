export const falseFunc = () => false;

/**
 *
 * @param {number} oldValue
 * @param {number} newValue
 */
export function calculatePercentChange(oldValue, newValue) {
  if (oldValue && newValue) {
    return (((newValue - oldValue) / oldValue) * 100).toFixed(2) + '%';
  } else {
    return 0;
  }
}

export function getNumberOfShares(index) {
  const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
  if (portfolio) {
    const portfolioEntry = portfolio.lots[index];
    return portfolioEntry.boughtShares - portfolioEntry.soldShares;
  }
  return 0;
}
