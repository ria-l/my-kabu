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
    return null;
  }
}

export function getNumberOfShares(index) {
  const portfolio = window.localStorage.getItem('portfolio');
  if (portfolio) {
    const portfolioEntry = JSON.parse(portfolio).lots[index];
    return portfolioEntry.boughtShares - portfolioEntry.soldShares;
  }
  return 0;
}
