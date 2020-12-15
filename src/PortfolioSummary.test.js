import * as utilities from './utils/utilities';
import * as dateUtils from '../utils/dateUtils';

const today = new Date().toISOString().split('T')[0];
const yesterday = dateUtils.getYesterdaysDateInIso().split('T')[0];

describe('getDataForChart', () => {
  it('converts API data into chart-friendly format', () => {
    expect(utilities.getDataForChart('FAKE')).toEqual({
      name: 'Fake AF Inc',
      xAxisLabels: ['2020-08-03', '2020-08-04', '2020-08-05', yesterday, today],
      dataPoints: [1485, 1487, 1485.02, 1489.58, 1452.71],
    });
  });

  it("returns undefined if ticker doesn't exist", () => {
    expect(utilities.getDataForChart('asdf')).toEqual(undefined);
  });
});
