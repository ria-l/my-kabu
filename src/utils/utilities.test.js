import * as utilities from './utilities';

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
      soldDate: null,
      soldPrice: null,
    },
    {
      id: 3456,
      ticker: 'BABA',
      boughtShares: 2,
      boughtDate: '2020-05-07',
      broker: 'Robinhood',
      boughtPrice: 199.6,
      soldShares: 0,
      soldDate: null,
      soldPrice: null,
    },
  ],
});

describe('calculatePercentChange', () => {
  it('returns percent change between two numbers', () => {
    expect(utilities.calculatePercentChange(5, 10)).toEqual('100.00%');
  });

  it('returns error if inputs are invalid', () => {
    expect(utilities.calculatePercentChange(null, 5)).toEqual(null);
  });
});

describe('localstorage retrieval functions', () => {
  let getStorage;
  beforeEach(() => {
    getStorage = jest.spyOn(window.localStorage.__proto__, 'getItem');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getNumberOfShares', () => {
    it('returns number of owned shares for a given portfolio entry', () => {
      getStorage.mockReturnValue(testPortfolio);
      expect(utilities.getNumberOfShares(1)).toEqual(5);
      expect(getStorage).toHaveBeenCalledWith('portfolio');
      expect(getStorage.mock.calls.length).toEqual(1);
    });

    it('returns 0 if there is no portfolio in localstorage', () => {
      getStorage.mockReturnValue(null);
      expect(utilities.getNumberOfShares(1)).toEqual(0);
      expect(getStorage).toHaveBeenCalledWith('portfolio');
      expect(getStorage.mock.calls.length).toEqual(1);
    });
  });
});
