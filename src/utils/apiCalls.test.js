import * as apiCalls from './apiCalls';

describe('getStockPrice', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.spyOn(global, 'fetch');
  });
  afterEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  it('market open, no local data', () => {
    const date = new Date(
      'Thu Dec 10 2020 12:00:00 GMT-0800 (Pacific Standard Time)'
    );
    return apiCalls.getStockPrice('BABA', date).then((data) => {
      expect(data).toBe(264.87);
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it('market open, pre-stored data', () => {
    window.localStorage.setItem(
      'BABA-2020-12-10T00:00:00.000Z',
      JSON.stringify(264.87)
    );
    const date = new Date(
      'Thu Dec 10 2020 12:00:00 GMT-0800 (Pacific Standard Time)'
    );
    return apiCalls.getStockPrice('BABA', date).then((data) => {
      expect(data).toBe(264.87);
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });

  it('market closed, no local data', () => {
    const date = new Date(
      'Sat Dec 12 2020 12:00:00 GMT-0800 (Pacific Standard Time)'
    );
    return apiCalls.getStockPrice('BABA', date).then((data) => {
      expect(data).toBe('no data');
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it('market closed, pre-stored data', () => {
    window.localStorage.setItem(
      'BABA-2020-12-12T00:00:00.000Z',
      JSON.stringify('no data')
    );
    const date = new Date(
      'Sat Dec 12 2020 12:00:00 GMT-0800 (Pacific Standard Time)'
    );
    return apiCalls.getStockPrice('BABA', date).then((data) => {
      expect(data).toBe(0);
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });
});
