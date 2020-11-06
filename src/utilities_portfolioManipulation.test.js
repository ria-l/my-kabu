import * as Utilities from './utilities';

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

describe('Functions that manipulate the portfolio (CRUD)', () => {
  describe('addLotToPortfolio', () => {
    afterEach(() => {
      window.localStorage.clear();
    });

    it('correctly adds inputted ticker to portfolio', () => {
      Utilities.addLotToPortfolio('FAKE', 3, 40.23, '2020-05-06', 'RobinHood');
      const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
      expect(portfolio.lots.length).toEqual(1);
      expect(portfolio.lots[0].symbol).toEqual('FAKE');
    });

    it('correctly adds inputted number of shares to portfolio', () => {
      Utilities.addLotToPortfolio('FAKE', 3, 40.23, '2020-05-06', 'RobinHood');
      const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
      expect(portfolio.lots[0].boughtShares).toEqual(3);
    });

    it('correctly adds inputted bought price to portfolio', () => {
      Utilities.addLotToPortfolio('FAKE', 3, 40.23, '2020-05-06', 'RobinHood');
      const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
      expect(portfolio.lots[0].boughtPrice).toEqual(40.23);
    });

    it('correctly adds inputted bought date to portfolio', () => {
      Utilities.addLotToPortfolio('FAKE', 3, 40.23, '2020-05-06', 'RobinHood');
      const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
      expect(portfolio.lots[0].boughtDate).toEqual('2020-05-06T00:00:00.000Z');
    });
    it('correctly adds inputted broker to portfolio', () => {
      Utilities.addLotToPortfolio('FAKE', 3, 40.23, '2020-05-06', 'RobinHood');
      const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
      expect(portfolio.lots[0].broker).toEqual('RobinHood');
    });
  });

  describe('deleteLotFromPortfolio', () => {
    it('removes a lot from the localstorage portfolio', () => {
      Utilities.addLotToPortfolio('FAKE');
      Utilities.deleteLotFromPortfolio(1234);
      const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
      expect(portfolio.lots.length).toEqual(0);
    });
  });
});
