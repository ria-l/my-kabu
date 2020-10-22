import * as Utilities from './utilities';

const testPortfolio = JSON.stringify({
  name: 'To The Moon',
  lots: [
    {
      symbol: 'AMZN',
      boughtShares: 1,
      boughtDate: '2020-06-16',
      broker: 'Robinhood',
      boughtPrice: 2619.97,
      soldShares: 1,
      soldDate: '2020-07-13',
      soldPrice: 3175.0,
    },
    {
      symbol: 'MSFT',
      boughtShares: 5,
      boughtDate: '2020-07-14',
      broker: 'Robinhood',
      boughtPrice: 107.97,
      soldShares: 0,
      soldDate: null,
      soldPrice: null,
    },
    {
      symbol: 'BABA',
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

let getStorage;

describe('formatDateToIso', () => {
  it('convert a Date object to a string formatted YYYY-MM-DD', () => {
    const testDate = new Date('December 17, 1995 03:24:00');
    expect(Utilities.formatDateToIso(testDate)).toEqual('1995-12-17');
  });
});

describe('getTodaysPrice', () => {
  it("returns today's close price for a given ticker, if it exists", () => {
    expect(Utilities.getTodaysPrice('FAKE')).toEqual(1452.71);
  });
});

describe('getYesterdaysPrice', () => {
  it("returns yesterday's close price for a given ticker, if it exists", () => {
    expect(Utilities.getYesterdaysPrice('FAKE')).toEqual(1489.58);
  });
});

describe('calculatePercentChange', () => {
  it('returns percent change between two numbers', () => {
    expect(Utilities.calculatePercentChange(5, 10)).toEqual('100.00%');
  });

  it('returns error if inputs are invalid', () => {
    expect(Utilities.calculatePercentChange(null, 5)).toEqual(null);
  });
});

describe('StockList local storage tests', () => {
  beforeEach(() => {
    getStorage = jest.spyOn(window.localStorage.__proto__, 'getItem');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getNumberOfShares', () => {
    it('returns number of owned shares for a given portfolio entry', () => {
      getStorage.mockReturnValue(testPortfolio);
      expect(Utilities.getNumberOfShares(1)).toEqual(5);
      expect(getStorage).toHaveBeenCalledWith('portfolio');
      expect(getStorage.mock.calls.length).toEqual(1);
    });

    it('returns 0 if there is no portfolio in localstorage', () => {
      getStorage.mockReturnValue(undefined);
      expect(Utilities.getNumberOfShares(1)).toEqual(0);
      expect(getStorage).toHaveBeenCalledWith('portfolio');
      expect(getStorage.mock.calls.length).toEqual(1);
    });
  });
});
