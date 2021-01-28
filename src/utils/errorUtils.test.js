import * as errorUtils from './errorUtils';

describe('field validation', () => {
  const badValues = {
    ticker: 0,
    boughtShares: 'x',
    boughtPrice: 'x',
    date: '2021-01-01T20:00:00.000Z',
    broker: 3,
  };

  const goodValues = {
    ticker: 'x',
    boughtShares: 3,
    boughtPrice: 3,
    date: '2021-01-01T20:00:00.000Z',
    broker: 'x',
  };

  describe('isString', () => {
    it('returns true if value is a string', () => {
      expect(errorUtils.isString('a string')).toBeTruthy();
    });
    it('returns false if value is not a string', () => {
      expect(errorUtils.isString(1234)).toBeFalsy();
      expect(errorUtils.isString({ x: 3 })).toBeFalsy();
    });
  });

  describe('isNum', () => {
    it('returns true if value is a number', () => {
      expect(errorUtils.isNum(1234)).toBeTruthy();
    });
    it('returns false if value is not a number', () => {
      expect(errorUtils.isNum('a string')).toBeFalsy();
      expect(errorUtils.isNum({ x: 3 })).toBeFalsy();
    });
  });

  describe('fieldsAreValid', () => {
    it('returns true if fields are valid', () => {
      expect(errorUtils.fieldsAreValid(goodValues)).toBeTruthy();
    });
    it('returns false if fields are invalid', () => {
      expect(errorUtils.fieldsAreValid(badValues)).toBeFalsy();
    });
  });

  describe('validateTicker', () => {
    it('returns true if valid ticker', () => {
      return errorUtils.validateTicker('TSLA').then((data) => {
        expect(data).toBeTruthy();
      });
    });
    it('returns false if invalid ticker', () => {
      return errorUtils.validateTicker('FAKE').then((data) => {
        expect(data).toBeFalsy();
      });
    });
  });
});
