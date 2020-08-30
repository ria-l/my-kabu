const getDataForChart = require('./index');

window.fetch = (url) => {
  if (url.includes('daily')) {
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
  } else if (url.includes('ticker')) {
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          endDate: '2020-08-28',
          description:
            'Tesla Motors, Inc. (Tesla) designs, develops, manufactures and sells electric vehicles and advanced electric vehicle powertrain components. Tesla owns its sales and service network. The Company is engaged in commercially producing a federally-compliant electric vehicle, the Tesla Roadster. addition to developing its Model S and future vehicle manufacturing capabilities at the Tesla Factory, the Company is designing, developing and manufacturing lithium-ion battery packs, electric motors, gearboxes and components both for its vehicles and for its original equipment manufacturer customers. These activities occur at its electric powertrain manufacturing facility in Palo Alto, California and at the Tesla Factory. The Company provides services for the development of electric powertrain components and sells electric powertrain components to other automotive manufacturers.',
          exchangeCode: 'NASDAQ',
          ticker: 'TSLA',
          name: 'Tesla Motors Inc',
          startDate: '2010-06-29',
        }),
    });
  }
};

it('gets label data for stock chart', async () => {
  const data = await getDataForChart('TSLA');
  expect(data).toEqual({
    xAxisLabels: [
      '2020-08-03',
      '2020-08-04',
      '2020-08-05',
      '2020-08-06',
      '2020-08-07',
    ],
    yAxisLabels: [1485.0, 1487.0, 1485.02, 1489.58, 1452.71],
    ticker: 'TSLA',
    name: 'Tesla Motors Inc',
  });
});
