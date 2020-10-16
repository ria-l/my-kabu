import React from 'react';
import { render } from '@testing-library/react';
import PortfolioSummary from './PortfolioSummary';
import * as PSFunctions from './PortfolioSummary';
import * as Constants from './constants';

let today = new Date();
today = Constants.formatDate(today);

let yesterday = new Date();
yesterday = yesterday.setDate(yesterday.getDate() - 1);
yesterday = Constants.formatDate(yesterday);

describe('getDataForChart', () => {
  it('converts API data into chart-friendly format', () => {
    expect(PSFunctions.getDataForChart('FAKE')).toEqual({
      name: 'Fake AF Inc',
      xAxisLabels: ['2020-08-03', '2020-08-04', '2020-08-05', yesterday, today],
      yAxisLabels: [1485, 1487, 1485.02, 1489.58, 1452.71],
    });
  });
});
