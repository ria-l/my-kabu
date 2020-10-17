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

describe('AddLot local storage tests', () => {
  describe('parseStorage', () => {
    it('adds a new element to localstorage portfolio', () => {
      Utilities.addLotToPortfolio('FAKE');
      const portfolio = JSON.parse(window.localStorage.getItem('portfolio'));
      expect(portfolio.lots.length).toEqual(1);
      expect(portfolio.lots[0].symbol).toEqual('FAKE');
    });
  });
});
