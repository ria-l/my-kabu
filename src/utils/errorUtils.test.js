import * as errorUtils from './errorUtils';

describe('field validation', () => {
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
