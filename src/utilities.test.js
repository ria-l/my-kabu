import * as Utilities from './utilities';
import { v4 as uuidv4 } from 'uuid';

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

describe('local storage tests', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  describe('addLotToPortfolio', () => {
    it('correctly adds inputted ticker to portfolio', () => {
      Utilities.addLotToPortfolio('FAKE', 3);
      const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
      expect(portfolio.lots.length).toEqual(1);
      expect(portfolio.lots[0].symbol).toEqual('FAKE');
    });

    it('correctly adds inputted number of shares to portfolio', () => {
      Utilities.addLotToPortfolio('FAKE', 3);
      const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
      expect(portfolio.lots[0].boughtShares).toEqual(3);
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
