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
    {
      id: 3456,
      ticker: 'BABA',
      boughtShares: 2,
      boughtDate: '2020-05-07',
      broker: 'Robinhood',
      boughtPrice: 199.6,
      soldShares: 0,
      soldDate: '',
      soldPrice: 0,
    },
  ],
});

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = value.toString();
  }
  removeItem(key) {
    delete this.store[key];
  }
}

window.localStorage = new LocalStorageMock();

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

// describe('fillPortfolioValuePromises', () => {
//   beforeEach(() => {
//     window.localStorage.setItem('portfolio', testPortfolio);
//   });
//   afterEach(() => {
//     window.localStorage.clear();
//   });
//   it('happy path', () => {
//     const startDate = new Date('2020-12-10');
//     const endDate = new Date();
//     const dateRange = dateUtils.getDateRange(startDate, endDate);
//     const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));

//     return chartUtils
//       .fillPortfolioValuePromises(dateRange, portfolio)
//       .then((data) => {
//         expect(data).toBe('');
//       });
//   });
// });

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
      expect(data).toBe(4683.83);
    });
  });
  it('today', () => {
    const date = new Date(
      'Tue Dec 29 2020 17:24:29 GMT-0800 (Pacific Standard Time)'
    );
    const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
    return chartUtils.getPortfolioValue(portfolio, date).then((data) => {
      expect(data).toBe(4915.27);
    });
  });
});
