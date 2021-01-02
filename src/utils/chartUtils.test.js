import * as chartUtils from './chartUtils';
import * as dateUtils from './dateUtils';

const testPortfolio = JSON.stringify({
  name: 'To The Moon',
  lots: [
    {
      id: 1234,
      ticker: 'AMZN',
      boughtShares: 1,
      boughtDate: '2020-06-16',
      broker: 'Robinhood',
      boughtPrice: 2619.97,
      soldShares: 1,
      soldDate: '2020-07-13',
      soldPrice: 3175.0,
    },
    {
      id: 2345,
      ticker: 'MSFT',
      boughtShares: 5,
      boughtDate: '2020-07-14',
      broker: 'Robinhood',
      boughtPrice: 107.97,
      soldShares: 0,
      soldDate: '',
      soldPrice: 0,
    },
  ],
});

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => 1234),
  };
});

// describe('getChartLabels', () => {
//   beforeEach(() => {
//     window.localStorage.setItem('portfolio', testPortfolio);
//   });
//   afterEach(() => {
//     window.localStorage.clear();
//   });
//   it('returns data for chart', () => {
//     return chartUtils
//       .getChartLabels(new Date('2020-12-10'), new Date())
//       .then((data) => {
//         expect(data).toBe('');
//       });
//   });
//   it('returns nothing if no portfolio found', () => {
//     window.localStorage.clear();
//     return chartUtils
//       .getChartLabels(new Date('2020-12-10'), new Date())
//       .then((data) => {
//         expect(data).toBe(undefined);
//       });
//   });
// });

describe('fillPortfolioValuePromises', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.localStorage.setItem('portfolio', testPortfolio);
  });
  afterEach(() => {
    window.localStorage.clear();
  });

  it('happy path', async () => {
    const startDate = new Date(
      'Thu Dec 10 2020 12:00:00 GMT-0800 (Pacific Standard Time)'
    );
    const endDate = new Date(
      'Mon Dec 14 2020 12:00:00 GMT-0800 (Pacific Standard Time)'
    );
    const dateRange = dateUtils.getDateRange(startDate, endDate);
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    const promises = await chartUtils.fillPortfolioValuePromises(
      dateRange,
      portfolio
    );
    const portfolioValues = await Promise.all(promises);
    expect(portfolioValues).toStrictEqual([4154.09, 4182.72, 0, 0, 4227.97]);
    /**
     * msft: 210.52, 213.26, 0, 0, 214.2
     * amzn: 3101.49, 3116.42, 0, 0, 3156.97
     */
  });
});

describe('getPortfolioValue', () => {
  beforeEach(() => {
    window.localStorage.setItem('portfolio', testPortfolio);
  });
  afterEach(() => {
    window.localStorage.clear();
  });

  it('datepicker', () => {
    const date = new Date(
      'Thu Dec 10 2020 12:00:00 GMT-0800 (Pacific Standard Time)'
    );
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    return chartUtils.getPortfolioValue(portfolio, date).then((data) => {
      expect(data).toBe(4154.09); // amzn: 3101.49, msft: 210.52
    });
  });

  it('today', () => {
    const date = new Date(
      'Tue Dec 29 2020 17:24:29 GMT-0800 (Pacific Standard Time)'
    );
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    return chartUtils.getPortfolioValue(portfolio, date).then((data) => {
      expect(data).toBe(4442.75); // amzn: 3322, msft: 224.15
    });
  });
});
