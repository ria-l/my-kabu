import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { getDataForChart } from './App';
import * as Constants from './Const';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('stock metadata exists', () => {
  expect(Constants.FAKE_META).toEqual(expect.anything());
});

it('stock price data exists', () => {
  expect(Constants.FAKE_PRICES).toEqual(expect.anything());
});

it('getDataForChart(): returns object with data and labels for stock chart', () => {
  const data = getDataForChart();
  expect(data).toEqual({
    xAxisLabels: [
      '2020-08-03',
      '2020-08-04',
      '2020-08-05',
      '2020-08-06',
      '2020-08-07',
    ],
    yAxisLabels: [1485.0, 1487.0, 1485.02, 1489.58, 1452.71],
    name: 'Fake AF Inc',
  });
});
