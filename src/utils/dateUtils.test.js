import * as dateUtils from './dateUtils';

describe('setDateToUtcMidnight', () => {
  it('new Date()', () => {
    const date = new Date(
      'Fri Jan 01 2021 17:24:29 GMT-0800 (Pacific Standard Time)'
    );
    console.log(date);
    expect(dateUtils.setDateToUtcMidnight(date)).toEqual(
      new Date('2021-01-01T00:00:00.000Z')
    );
  });

  it('datePicker', () => {
    const date = new Date('2020-12-10T20:00:00.000Z');
    console.log(date);
    expect(dateUtils.setDateToUtcMidnight(date)).toEqual(
      new Date('2020-12-10T00:00:00.000Z')
    );
  });
});
