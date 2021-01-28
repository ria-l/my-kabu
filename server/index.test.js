window.fetch = (url) => {
  if (url.includes('prices')) {
    return Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            date: '2020-08-03T00:00:00.000Z',
            close: 1485.0,
            high: 1509.8101,
            low: 1444.3844,
            open: 1449.2,
            volume: 8809346,
            adjClose: 1485.0,
            adjHigh: 1509.8101,
            adjLow: 1444.3844,
            adjOpen: 1449.2,
            adjVolume: 8809346,
            divCash: 0.0,
            splitFactor: 1.0,
          },
          {
            date: '2020-08-04T00:00:00.000Z',
            close: 1487.0,
            high: 1527.41,
            low: 1462.0,
            open: 1495.01,
            volume: 8414990,
            adjClose: 1487.0,
            adjHigh: 1527.41,
            adjLow: 1462.0,
            adjOpen: 1495.01,
            adjVolume: 8414990,
            divCash: 0.0,
            splitFactor: 1.0,
          },
          {
            date: '2020-08-05T00:00:00.000Z',
            close: 1485.02,
            high: 1499.8384,
            low: 1468.31,
            open: 1492.99,
            volume: 4978015,
            adjClose: 1485.02,
            adjHigh: 1499.8384,
            adjLow: 1468.31,
            adjOpen: 1492.99,
            adjVolume: 4978015,
            divCash: 0.0,
            splitFactor: 1.0,
          },
          {
            date: '2020-08-06T00:00:00.000Z',
            close: 1489.58,
            high: 1517.31,
            low: 1477.26,
            open: 1490.83,
            volume: 5992313,
            adjClose: 1489.58,
            adjHigh: 1517.31,
            adjLow: 1477.26,
            adjOpen: 1490.83,
            adjVolume: 5992313,
            divCash: 0.0,
            splitFactor: 1.0,
          },
          {
            date: '2020-08-07T00:00:00.000Z',
            close: 1452.71,
            high: 1499.75,
            low: 1415.01,
            open: 1499.5365,
            volume: 8896420,
            adjClose: 1452.71,
            adjHigh: 1499.75,
            adjLow: 1415.01,
            adjOpen: 1499.5365,
            adjVolume: 8896420,
            divCash: 0.0,
            splitFactor: 1.0,
          },
        ]),
    });
  }
  if (url.includes('meta')) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          endDate: '2021-01-27',
          exchangeCode: 'NASDAQ',
          startDate: '2010-06-29',
          description: 'fake data is fake.',
          name: 'Fake',
          ticker: 'FAKE',
        }),
    });
  }
};

it('API: calls /prices for historical price data', async () => {
  const response = await fetch(`/prices/FAKE`);
  const data = await response.json();
  expect(data).toEqual([
    {
      adjClose: 1485,
      adjHigh: 1509.8101,
      adjLow: 1444.3844,
      adjOpen: 1449.2,
      adjVolume: 8809346,
      close: 1485,
      date: '2020-08-03T00:00:00.000Z',
      divCash: 0,
      high: 1509.8101,
      low: 1444.3844,
      open: 1449.2,
      splitFactor: 1,
      volume: 8809346,
    },
    {
      adjClose: 1487,
      adjHigh: 1527.41,
      adjLow: 1462,
      adjOpen: 1495.01,
      adjVolume: 8414990,
      close: 1487,
      date: '2020-08-04T00:00:00.000Z',
      divCash: 0,
      high: 1527.41,
      low: 1462,
      open: 1495.01,
      splitFactor: 1,
      volume: 8414990,
    },
    {
      adjClose: 1485.02,
      adjHigh: 1499.8384,
      adjLow: 1468.31,
      adjOpen: 1492.99,
      adjVolume: 4978015,
      close: 1485.02,
      date: '2020-08-05T00:00:00.000Z',
      divCash: 0,
      high: 1499.8384,
      low: 1468.31,
      open: 1492.99,
      splitFactor: 1,
      volume: 4978015,
    },
    {
      adjClose: 1489.58,
      adjHigh: 1517.31,
      adjLow: 1477.26,
      adjOpen: 1490.83,
      adjVolume: 5992313,
      close: 1489.58,
      date: '2020-08-06T00:00:00.000Z',
      divCash: 0,
      high: 1517.31,
      low: 1477.26,
      open: 1490.83,
      splitFactor: 1,
      volume: 5992313,
    },
    {
      adjClose: 1452.71,
      adjHigh: 1499.75,
      adjLow: 1415.01,
      adjOpen: 1499.5365,
      adjVolume: 8896420,
      close: 1452.71,
      date: '2020-08-07T00:00:00.000Z',
      divCash: 0,
      high: 1499.75,
      low: 1415.01,
      open: 1499.5365,
      splitFactor: 1,
      volume: 8896420,
    },
  ]);
});

it('API: calls /meta for historical price data', async () => {
  const response = await fetch(`/meta/FAKE`);
  const data = await response.json();
  expect(data).toEqual({
    endDate: '2021-01-27',
    exchangeCode: 'NASDAQ',
    startDate: '2010-06-29',
    description: 'fake data is fake.',
    name: 'Fake',
    ticker: 'FAKE',
  });
});
