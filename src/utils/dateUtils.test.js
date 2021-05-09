import * as dateUtils from './dateUtils';
import MockDate from 'mockdate';

describe('setDateToUtcMidnight', () => {
  it('new Date()', () => {
    const date = new Date(
      'Fri Jan 01 2021 17:24:29 GMT-0800 (Pacific Standard Time)'
    );
    expect(dateUtils.setDateToUtcMidnight(date)).toEqual(
      new Date('2021-01-01T00:00:00.000Z')
    );
  });

  it('datePicker', () => {
    const date = new Date('2020-12-10T20:00:00.000Z');
    expect(dateUtils.setDateToUtcMidnight(date)).toEqual(
      new Date('2020-12-10T00:00:00.000Z')
    );
  });
});

describe('yesterday', () => {
  beforeAll(() => {
    MockDate.set('2021-01-01T00:00:00.000Z');
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should return yesterdays date', () => {
    expect(dateUtils.yesterday())
      .valueOf()
      .toEqual(new Date('2020-12-31T00:00:00.000Z'));
  });
});
