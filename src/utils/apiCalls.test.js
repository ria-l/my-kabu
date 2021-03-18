import * as apiCalls from './apiCalls';

describe('getLastValidPrice', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.spyOn(global, 'fetch');
  });
  afterEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  it('date is not a business day', () => {
    const date = new Date('2020-12-13T20:00:00.000Z');
    return apiCalls.getLastValidPrice('BABA', date).then((data) => {
      expect(data).toBe(264.54);
    });
  });

  it('date is a business day', () => {
    const date = new Date('2020-12-14T20:00:00.000Z');
    return apiCalls.getLastValidPrice('BABA', date).then((data) => {
      expect(data).toBe(256.03);
    });
  });
});

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
    const date = new Date('2020-12-10T20:00:00.000Z');
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
    const date = new Date('2020-12-10T20:00:00.000Z');
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
      expect(data).toBe('');
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it('market closed, pre-stored data', () => {
    window.localStorage.setItem(
      'BABA-2020-12-12T00:00:00.000Z',
      JSON.stringify('')
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

describe('getStockMetaData', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.spyOn(global, 'fetch');
  });
  afterEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });
  it('idk', () => {
    return apiCalls.getStockMetadata('TSLA').then((data) => {
      expect(data).toBe(
        JSON.stringify({
          endDate: '2021-01-27',
          exchangeCode: 'NASDAQ',
          startDate: '2010-06-29',
          description:
            'Tesla Motors, Inc. (Tesla) designs, develops, manufactures and sells electric vehicles and advanced electric vehicle powertrain components. Tesla owns its sales and service network. The Company is engaged in commercially producing a federally-compliant electric vehicle, the Tesla Roadster. addition to developing its Model S and future vehicle manufacturing capabilities at the Tesla Factory, the Company is designing, developing and manufacturing lithium-ion battery packs, electric motors, gearboxes and components both for its vehicles and for its original equipment manufacturer customers. These activities occur at its electric powertrain manufacturing facility in Palo Alto, California and at the Tesla Factory. The Company provides services for the development of electric powertrain components and sells electric powertrain components to other automotive manufacturers.',
          name: 'Tesla Inc',
          ticker: 'TSLA',
        })
      );
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});
