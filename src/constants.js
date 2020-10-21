import * as Utilities from './utilities';

let today = new Date();
today = Utilities.formatDate(today);
today += 'T00:00:00+00:00Z';

let yesterday = new Date();
yesterday = yesterday.setDate(yesterday.getDate() - 1);
yesterday = Utilities.formatDate(yesterday);
yesterday += 'T00:00:00.000Z';

export const API_PRICES = {
  AMZN: [
    {
      date: '2020-05-06T00:00:00.000Z',
      close: 2351.26,
      high: 2357.45,
      low: 2320.0,
      open: 2329.44,
      volume: 3117814,
      adjClose: 2351.26,
      adjHigh: 2357.45,
      adjLow: 2320.0,
      adjOpen: 2329.44,
      adjVolume: 3117814,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-07T00:00:00.000Z',
      close: 2367.61,
      high: 2376.0,
      low: 2343.11,
      open: 2374.78,
      volume: 3396411,
      adjClose: 2367.61,
      adjHigh: 2376.0,
      adjLow: 2343.11,
      adjOpen: 2374.78,
      adjVolume: 3396411,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-08T00:00:00.000Z',
      close: 2379.61,
      high: 2387.24,
      low: 2357.0,
      open: 2372.14,
      volume: 3211228,
      adjClose: 2379.61,
      adjHigh: 2387.24,
      adjLow: 2357.0,
      adjOpen: 2372.14,
      adjVolume: 3211228,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-11T00:00:00.000Z',
      close: 2409.0,
      high: 2419.66,
      low: 2372.11,
      open: 2374.7,
      volume: 3259231,
      adjClose: 2409.0,
      adjHigh: 2419.66,
      adjLow: 2372.11,
      adjOpen: 2374.7,
      adjVolume: 3259231,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-12T00:00:00.000Z',
      close: 2356.95,
      high: 2419.0,
      low: 2355.0,
      open: 2411.85,
      volume: 3074916,
      adjClose: 2356.95,
      adjHigh: 2419.0,
      adjLow: 2355.0,
      adjOpen: 2411.85,
      adjVolume: 3074916,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-13T00:00:00.000Z',
      close: 2367.92,
      high: 2407.7,
      low: 2337.8,
      open: 2366.8,
      volume: 4782919,
      adjClose: 2367.92,
      adjHigh: 2407.7,
      adjLow: 2337.8,
      adjOpen: 2366.8,
      adjVolume: 4782919,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-14T00:00:00.000Z',
      close: 2388.85,
      high: 2391.37,
      low: 2353.21,
      open: 2361.01,
      volume: 3648128,
      adjClose: 2388.85,
      adjHigh: 2391.37,
      adjLow: 2353.21,
      adjOpen: 2361.01,
      adjVolume: 3648128,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-15T00:00:00.000Z',
      close: 2409.78,
      high: 2411.0,
      low: 2356.37,
      open: 2368.52,
      volume: 4234951,
      adjClose: 2409.78,
      adjHigh: 2411.0,
      adjLow: 2356.37,
      adjOpen: 2368.52,
      adjVolume: 4234951,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-18T00:00:00.000Z',
      close: 2426.26,
      high: 2433.0,
      low: 2384.01,
      open: 2402.48,
      volume: 4366572,
      adjClose: 2426.26,
      adjHigh: 2433.0,
      adjLow: 2384.01,
      adjOpen: 2402.48,
      adjVolume: 4366572,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-19T00:00:00.000Z',
      close: 2449.33,
      high: 2484.99,
      low: 2428.97,
      open: 2429.83,
      volume: 4320498,
      adjClose: 2449.33,
      adjHigh: 2484.99,
      adjLow: 2428.97,
      adjOpen: 2429.83,
      adjVolume: 4320498,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-20T00:00:00.000Z',
      close: 2497.94,
      high: 2500.01,
      low: 2467.27,
      open: 2477.87,
      volume: 3998143,
      adjClose: 2497.94,
      adjHigh: 2500.01,
      adjLow: 2467.27,
      adjOpen: 2477.87,
      adjVolume: 3998143,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-21T00:00:00.000Z',
      close: 2446.74,
      high: 2525.45,
      low: 2442.54,
      open: 2500.0,
      volume: 5114403,
      adjClose: 2446.74,
      adjHigh: 2525.45,
      adjLow: 2442.54,
      adjOpen: 2500.0,
      adjVolume: 5114403,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-22T00:00:00.000Z',
      close: 2436.88,
      high: 2469.85,
      low: 2430.13,
      open: 2455.01,
      volume: 2867079,
      adjClose: 2436.88,
      adjHigh: 2469.85,
      adjLow: 2430.13,
      adjOpen: 2455.01,
      adjVolume: 2867079,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-26T00:00:00.000Z',
      close: 2421.86,
      high: 2462.0,
      low: 2414.06,
      open: 2458.0,
      volume: 3568153,
      adjClose: 2421.86,
      adjHigh: 2462.0,
      adjLow: 2414.06,
      adjOpen: 2458.0,
      adjVolume: 3568153,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-27T00:00:00.000Z',
      close: 2410.39,
      high: 2413.58,
      low: 2330.0,
      open: 2404.99,
      volume: 5056945,
      adjClose: 2410.39,
      adjHigh: 2413.58,
      adjLow: 2330.0,
      adjOpen: 2404.99,
      adjVolume: 5056945,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-28T00:00:00.000Z',
      close: 2401.1,
      high: 2436.97,
      low: 2378.23,
      open: 2384.33,
      volume: 3193136,
      adjClose: 2401.1,
      adjHigh: 2436.97,
      adjLow: 2378.23,
      adjOpen: 2384.33,
      adjVolume: 3193136,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-29T00:00:00.000Z',
      close: 2442.37,
      high: 2442.37,
      low: 2398.2,
      open: 2415.94,
      volume: 3529329,
      adjClose: 2442.37,
      adjHigh: 2442.37,
      adjLow: 2398.2,
      adjOpen: 2415.94,
      adjVolume: 3529329,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-01T00:00:00.000Z',
      close: 2471.04,
      high: 2476.93,
      low: 2444.17,
      open: 2448.0,
      volume: 2938032,
      adjClose: 2471.04,
      adjHigh: 2476.93,
      adjLow: 2444.17,
      adjOpen: 2448.0,
      adjVolume: 2938032,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-02T00:00:00.000Z',
      close: 2472.41,
      high: 2473.53,
      low: 2445.31,
      open: 2467.0,
      volume: 2529903,
      adjClose: 2472.41,
      adjHigh: 2473.53,
      adjLow: 2445.31,
      adjOpen: 2467.0,
      adjVolume: 2529903,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-03T00:00:00.000Z',
      close: 2478.4,
      high: 2488.0,
      low: 2461.17,
      open: 2468.01,
      volume: 2671024,
      adjClose: 2478.4,
      adjHigh: 2488.0,
      adjLow: 2461.17,
      adjOpen: 2468.01,
      adjVolume: 2671024,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-04T00:00:00.000Z',
      close: 2460.6,
      high: 2507.54,
      low: 2450.01,
      open: 2477.43,
      volume: 2948710,
      adjClose: 2460.6,
      adjHigh: 2507.54,
      adjLow: 2450.01,
      adjOpen: 2477.43,
      adjVolume: 2948710,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-05T00:00:00.000Z',
      close: 2483.0,
      high: 2488.64,
      low: 2437.13,
      open: 2444.51,
      volume: 3306445,
      adjClose: 2483.0,
      adjHigh: 2488.64,
      adjLow: 2437.13,
      adjOpen: 2444.51,
      adjVolume: 3306445,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-08T00:00:00.000Z',
      close: 2524.06,
      high: 2530.0,
      low: 2487.34,
      open: 2500.2,
      volume: 3970654,
      adjClose: 2524.06,
      adjHigh: 2530.0,
      adjLow: 2487.34,
      adjOpen: 2500.2,
      adjVolume: 3970654,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-09T00:00:00.000Z',
      close: 2600.86,
      high: 2626.43,
      low: 2525.0,
      open: 2529.44,
      volume: 5175950,
      adjClose: 2600.86,
      adjHigh: 2626.43,
      adjLow: 2525.0,
      adjOpen: 2529.44,
      adjVolume: 5175950,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-10T00:00:00.000Z',
      close: 2647.45,
      high: 2722.35,
      low: 2626.26,
      open: 2645.0,
      volume: 4946031,
      adjClose: 2647.45,
      adjHigh: 2722.35,
      adjLow: 2626.26,
      adjOpen: 2645.0,
      adjVolume: 4946031,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-11T00:00:00.000Z',
      close: 2557.96,
      high: 2671.38,
      low: 2536.23,
      open: 2603.5,
      volume: 5800107,
      adjClose: 2557.96,
      adjHigh: 2671.38,
      adjLow: 2536.23,
      adjOpen: 2603.5,
      adjVolume: 5800107,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: yesterday,
      close: 2545.02,
      high: 2621.48,
      low: 2503.35,
      open: 2601.21,
      volume: 5436127,
      adjClose: 2545.02,
      adjHigh: 2621.48,
      adjLow: 2503.35,
      adjOpen: 2601.21,
      adjVolume: 5436127,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: today,
      close: 3125,
      high: 3195.7965,
      low: 3123,
      open: 3153.63,
      volume: 5613098,
      adjClose: 3125,
      adjHigh: 3195.7965,
      adjLow: 3123,
      adjOpen: 3153.63,
      adjVolume: 5613098,
      divCash: 0,
      splitFactor: 1,
    },
  ],
  MSFT: [
    {
      date: '2020-05-06T00:00:00.000Z',
      close: 182.54,
      high: 184.2,
      low: 181.63,
      open: 182.08,
      volume: 32139299,
      adjClose: 181.5982887852,
      adjHigh: 183.2497249602,
      adjLow: 180.6929834122,
      adjOpen: 181.1406618934,
      adjVolume: 32139299,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-07T00:00:00.000Z',
      close: 183.6,
      high: 184.55,
      low: 182.58,
      open: 184.17,
      volume: 28315992,
      adjClose: 182.6528203187,
      adjHigh: 183.5979193345,
      adjLow: 181.638082428,
      adjOpen: 183.2198797282,
      adjVolume: 28315992,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-08T00:00:00.000Z',
      close: 184.68,
      high: 185.0,
      low: 183.36,
      open: 184.98,
      volume: 30912638,
      adjClose: 183.7272486735,
      adjHigh: 184.0455978157,
      adjLow: 182.414058462,
      adjOpen: 184.0257009943,
      adjVolume: 30912638,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-11T00:00:00.000Z',
      close: 186.74,
      high: 187.51,
      low: 182.85,
      open: 183.15,
      volume: 30892660,
      adjClose: 185.7766212762,
      adjHigh: 186.5426488995,
      adjLow: 181.9066895167,
      adjOpen: 182.2051418375,
      adjVolume: 30892660,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-12T00:00:00.000Z',
      close: 182.51,
      high: 187.04,
      low: 182.3,
      open: 186.8,
      volume: 32038199,
      adjClose: 181.5684435532,
      adjHigh: 186.075073597,
      adjLow: 181.3595269286,
      adjOpen: 185.8363117403,
      adjVolume: 32038199,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-13T00:00:00.000Z',
      close: 179.75,
      high: 184.05,
      low: 176.54,
      open: 182.55,
      volume: 44711488,
      adjClose: 178.822682202,
      adjHigh: 183.1004987998,
      adjLow: 175.6292423696,
      adjOpen: 181.6082371959,
      adjVolume: 44711488,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-14T00:00:00.000Z',
      close: 180.53,
      high: 180.69,
      low: 175.68,
      open: 177.54,
      volume: 41873911,
      adjClose: 179.598658236,
      adjHigh: 179.7578328071,
      adjLow: 174.77367905,
      adjOpen: 176.6240834389,
      adjVolume: 41873911,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-15T00:00:00.000Z',
      close: 183.16,
      high: 187.06,
      low: 177.0,
      open: 179.06,
      volume: 46610382,
      adjClose: 182.2150902482,
      adjHigh: 186.0949704184,
      adjLow: 176.0868692615,
      adjOpen: 178.1362418642,
      adjVolume: 46610382,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-18T00:00:00.000Z',
      close: 184.91,
      high: 186.2,
      low: 183.96,
      open: 185.75,
      volume: 35306620,
      adjClose: 183.9560621194,
      adjHigh: 185.2394070988,
      adjLow: 183.0109631036,
      adjOpen: 184.7917286176,
      adjVolume: 35306620,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-19T00:00:00.000Z',
      close: 183.63,
      high: 186.6,
      low: 183.49,
      open: 185.03,
      volume: 26799116,
      adjClose: 182.6826655507,
      adjHigh: 185.6373435265,
      adjLow: 182.5433878011,
      adjOpen: 184.0754430477,
      adjVolume: 26799116,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-20T00:00:00.000Z',
      close: 185.66,
      high: 185.85,
      low: 183.94,
      open: 184.81,
      volume: 31261334,
      adjClose: 185.2095618667,
      adjHigh: 185.3991008991,
      adjLow: 183.4937348366,
      adjOpen: 184.3616240902,
      adjVolume: 31261334,
      divCash: 0.51,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-21T00:00:00.000Z',
      close: 183.43,
      high: 186.67,
      low: 183.29,
      open: 185.4,
      volume: 29032741,
      adjClose: 182.9849721707,
      adjHigh: 186.21711146,
      adjLow: 182.845311831,
      adjOpen: 184.9501926645,
      adjVolume: 29032741,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-22T00:00:00.000Z',
      close: 183.51,
      high: 184.46,
      low: 182.54,
      open: 183.19,
      volume: 20826898,
      adjClose: 183.0647780791,
      adjHigh: 184.012473241,
      adjLow: 182.09713144,
      adjOpen: 182.7455544456,
      adjVolume: 20826898,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-26T00:00:00.000Z',
      close: 181.57,
      high: 186.5,
      low: 181.1,
      open: 186.34,
      volume: 36073609,
      adjClose: 181.1294848009,
      adjHigh: 186.0475239047,
      adjLow: 180.6606250892,
      adjOpen: 185.8879120879,
      adjVolume: 36073609,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-27T00:00:00.000Z',
      close: 181.81,
      high: 181.99,
      low: 176.6,
      open: 180.2,
      volume: 39517146,
      adjClose: 181.368902526,
      adjHigh: 181.5484658199,
      adjLow: 176.171542743,
      adjOpen: 179.76280862,
      adjVolume: 39517146,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-28T00:00:00.000Z',
      close: 181.4,
      high: 184.15,
      low: 180.38,
      open: 180.74,
      volume: 33831824,
      adjClose: 180.9598972456,
      adjHigh: 183.7032253461,
      adjLow: 179.9423719138,
      adjOpen: 180.3014985015,
      adjVolume: 33831824,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-29T00:00:00.000Z',
      close: 183.25,
      high: 184.27,
      low: 180.41,
      open: 182.73,
      volume: 42146720,
      adjClose: 182.8054088768,
      adjHigh: 183.8229342086,
      adjLow: 179.9722991294,
      adjOpen: 182.2866704724,
      adjVolume: 42146720,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-01T00:00:00.000Z',
      close: 182.83,
      high: 183.0,
      low: 181.46,
      open: 182.54,
      volume: 22668821,
      adjClose: 182.3864278579,
      adjHigh: 182.5560154132,
      adjLow: 181.0197516769,
      adjOpen: 182.09713144,
      adjVolume: 22668821,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-02T00:00:00.000Z',
      close: 184.91,
      high: 185.0,
      low: 181.35,
      open: 184.25,
      volume: 30794585,
      adjClose: 184.4613814757,
      adjHigh: 184.5511631226,
      adjLow: 180.9100185529,
      adjOpen: 183.8029827316,
      adjVolume: 30794585,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-03T00:00:00.000Z',
      close: 185.36,
      high: 185.94,
      low: 183.58,
      open: 184.82,
      volume: 27311016,
      adjClose: 184.9102897103,
      adjHigh: 185.488882546,
      adjLow: 183.1346082489,
      adjOpen: 184.3715998287,
      adjVolume: 27311016,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-04T00:00:00.000Z',
      close: 182.92,
      high: 185.84,
      low: 182.3,
      open: 184.3,
      volume: 28761809,
      adjClose: 182.4762095048,
      adjHigh: 185.3891251606,
      adjLow: 181.8577137149,
      adjOpen: 183.8528614243,
      adjVolume: 28761809,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-05T00:00:00.000Z',
      close: 187.2,
      high: 187.73,
      low: 182.01,
      open: 182.62,
      volume: 39893643,
      adjClose: 186.745825603,
      adjHigh: 187.274539746,
      adjLow: 181.568417297,
      adjOpen: 182.1769373484,
      adjVolume: 39893643,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-08T00:00:00.000Z',
      close: 188.36,
      high: 188.55,
      low: 184.44,
      open: 185.94,
      volume: 33211590,
      adjClose: 187.9030112744,
      adjHigh: 188.0925503068,
      adjLow: 183.992521764,
      adjOpen: 185.488882546,
      adjVolume: 33211590,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-09T00:00:00.000Z',
      close: 189.8,
      high: 190.7,
      low: 187.26,
      open: 188.0,
      volume: 29783916,
      adjClose: 189.3395176252,
      adjHigh: 190.2373340945,
      adjLow: 186.8056800343,
      adjOpen: 187.5438846867,
      adjVolume: 29783916,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-10T00:00:00.000Z',
      close: 196.84,
      high: 198.52,
      low: 191.01,
      open: 191.13,
      volume: 43872329,
      adjClose: 196.3624375624,
      adjHigh: 198.0383616384,
      adjLow: 190.5465819894,
      adjOpen: 190.666290852,
      adjVolume: 43872329,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-11T00:00:00.000Z',
      close: 186.27,
      high: 195.76,
      low: 186.07,
      open: 193.13,
      volume: 52854672,
      adjClose: 185.8180819181,
      adjHigh: 195.2850577993,
      adjLow: 185.6185671471,
      adjOpen: 192.6614385614,
      adjVolume: 52854672,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: yesterday,
      close: 187.74,
      high: 191.72,
      low: 185.18,
      open: 190.54,
      volume: 43373587,
      adjClose: 187.2845154845,
      adjHigh: 191.2548594263,
      adjLow: 184.7307264164,
      adjOpen: 190.0777222777,
      adjVolume: 43373587,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: today,
      close: 3221.26,
      high: 3224,
      low: 3172,
      open: 3208,
      volume: 4971922,
      adjClose: 3221.26,
      adjHigh: 3224,
      adjLow: 3172,
      adjOpen: 3208,
      adjVolume: 4971922,
      divCash: 0,
      splitFactor: 1,
    },
  ],
  BABA: [
    {
      date: '2020-05-06T00:00:00.000Z',
      close: 195.17,
      high: 198.91,
      low: 194.93,
      open: 197.67,
      volume: 18568364,
      adjClose: 195.17,
      adjHigh: 198.91,
      adjLow: 194.93,
      adjOpen: 197.67,
      adjVolume: 18568364,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-07T00:00:00.000Z',
      close: 196.49,
      high: 198.09,
      low: 194.78,
      open: 198.0,
      volume: 16145559,
      adjClose: 196.49,
      adjHigh: 198.09,
      adjLow: 194.78,
      adjOpen: 198.0,
      adjVolume: 16145559,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-08T00:00:00.000Z',
      close: 201.19,
      high: 203.02,
      low: 198.68,
      open: 199.8,
      volume: 23817300,
      adjClose: 201.19,
      adjHigh: 203.02,
      adjLow: 198.68,
      adjOpen: 199.8,
      adjVolume: 23817300,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-11T00:00:00.000Z',
      close: 205.4,
      high: 206.64,
      low: 202.38,
      open: 202.78,
      volume: 17882720,
      adjClose: 205.4,
      adjHigh: 206.64,
      adjLow: 202.38,
      adjOpen: 202.78,
      adjVolume: 17882720,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-12T00:00:00.000Z',
      close: 200.31,
      high: 208.05,
      low: 200.02,
      open: 206.95,
      volume: 17760752,
      adjClose: 200.31,
      adjHigh: 208.05,
      adjLow: 200.02,
      adjOpen: 206.95,
      adjVolume: 17760752,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-13T00:00:00.000Z',
      close: 199.46,
      high: 204.68,
      low: 197.98,
      open: 203.62,
      volume: 22389122,
      adjClose: 199.46,
      adjHigh: 204.68,
      adjLow: 197.98,
      adjOpen: 203.62,
      adjVolume: 22389122,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-14T00:00:00.000Z',
      close: 201.3,
      high: 201.77,
      low: 194.03,
      open: 195.5,
      volume: 20003525,
      adjClose: 201.3,
      adjHigh: 201.77,
      adjLow: 194.03,
      adjOpen: 195.5,
      adjVolume: 20003525,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-15T00:00:00.000Z',
      close: 203.68,
      high: 204.4899,
      low: 200.1,
      open: 200.7,
      volume: 17163434,
      adjClose: 203.68,
      adjHigh: 204.4899,
      adjLow: 200.1,
      adjOpen: 200.7,
      adjVolume: 17163434,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-18T00:00:00.000Z',
      close: 215.28,
      high: 215.47,
      low: 210.37,
      open: 212.5,
      volume: 23552319,
      adjClose: 215.28,
      adjHigh: 215.47,
      adjLow: 210.37,
      adjOpen: 212.5,
      adjVolume: 23552319,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-19T00:00:00.000Z',
      close: 217.2,
      high: 220.59,
      low: 215.19,
      open: 216.73,
      volume: 21381072,
      adjClose: 217.2,
      adjHigh: 220.59,
      adjLow: 215.19,
      adjOpen: 216.73,
      adjVolume: 21381072,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-20T00:00:00.000Z',
      close: 216.79,
      high: 221.1574,
      low: 210.58,
      open: 220.0,
      volume: 38266364,
      adjClose: 216.79,
      adjHigh: 221.1574,
      adjLow: 210.58,
      adjOpen: 220.0,
      adjVolume: 38266364,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-21T00:00:00.000Z',
      close: 212.16,
      high: 214.58,
      low: 209.53,
      open: 211.29,
      volume: 29704742,
      adjClose: 212.16,
      adjHigh: 214.58,
      adjLow: 209.53,
      adjOpen: 211.29,
      adjVolume: 29704742,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-22T00:00:00.000Z',
      close: 199.7,
      high: 204.88,
      low: 198.99,
      open: 203.23,
      volume: 51903680,
      adjClose: 199.7,
      adjHigh: 204.88,
      adjLow: 198.99,
      adjOpen: 203.23,
      adjVolume: 51903680,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-26T00:00:00.000Z',
      close: 201.72,
      high: 206.8,
      low: 201.0,
      open: 205.94,
      volume: 28614238,
      adjClose: 201.72,
      adjHigh: 206.8,
      adjLow: 201.0,
      adjOpen: 205.94,
      adjVolume: 28614238,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-27T00:00:00.000Z',
      close: 201.18,
      high: 202.99,
      low: 196.75,
      open: 202.99,
      volume: 23578394,
      adjClose: 201.18,
      adjHigh: 202.99,
      adjLow: 196.75,
      adjOpen: 202.99,
      adjVolume: 23578394,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-28T00:00:00.000Z',
      close: 199.49,
      high: 202.37,
      low: 197.62,
      open: 199.0,
      volume: 18759470,
      adjClose: 199.49,
      adjHigh: 202.37,
      adjLow: 197.62,
      adjOpen: 199.0,
      adjVolume: 18759470,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-05-29T00:00:00.000Z',
      close: 207.39,
      high: 207.88,
      low: 196.7,
      open: 200.0,
      volume: 43174101,
      adjClose: 207.39,
      adjHigh: 207.88,
      adjLow: 196.7,
      adjOpen: 200.0,
      adjVolume: 43174101,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-01T00:00:00.000Z',
      close: 206.57,
      high: 207.2,
      low: 203.94,
      open: 205.9,
      volume: 16137492,
      adjClose: 206.57,
      adjHigh: 207.2,
      adjLow: 203.94,
      adjOpen: 205.9,
      adjVolume: 16137492,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-02T00:00:00.000Z',
      close: 214.33,
      high: 214.57,
      low: 207.17,
      open: 207.21,
      volume: 22450929,
      adjClose: 214.33,
      adjHigh: 214.57,
      adjLow: 207.17,
      adjOpen: 207.21,
      adjVolume: 22450929,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-03T00:00:00.000Z',
      close: 218.61,
      high: 218.97,
      low: 213.75,
      open: 215.6,
      volume: 19980930,
      adjClose: 218.61,
      adjHigh: 218.97,
      adjLow: 213.75,
      adjOpen: 215.6,
      adjVolume: 19980930,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-04T00:00:00.000Z',
      close: 218.04,
      high: 220.0,
      low: 216.32,
      open: 217.28,
      volume: 14947048,
      adjClose: 218.04,
      adjHigh: 220.0,
      adjLow: 216.32,
      adjOpen: 217.28,
      adjVolume: 14947048,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-05T00:00:00.000Z',
      close: 219.55,
      high: 220.59,
      low: 218.7,
      open: 220.0,
      volume: 11973943,
      adjClose: 219.55,
      adjHigh: 220.59,
      adjLow: 218.7,
      adjOpen: 220.0,
      adjVolume: 11973943,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-08T00:00:00.000Z',
      close: 219.0,
      high: 220.4,
      low: 215.33,
      open: 219.6,
      volume: 12711230,
      adjClose: 219.0,
      adjHigh: 220.4,
      adjLow: 215.33,
      adjOpen: 219.6,
      adjVolume: 12711230,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-09T00:00:00.000Z',
      close: 220.72,
      high: 220.72,
      low: 216.2,
      open: 216.31,
      volume: 14123015,
      adjClose: 220.72,
      adjHigh: 220.72,
      adjLow: 216.2,
      adjOpen: 216.31,
      adjVolume: 14123015,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-10T00:00:00.000Z',
      close: 223.68,
      high: 225.0,
      low: 220.6,
      open: 222.0,
      volume: 13253588,
      adjClose: 223.68,
      adjHigh: 225.0,
      adjLow: 220.6,
      adjOpen: 222.0,
      adjVolume: 13253588,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: '2020-06-11T00:00:00.000Z',
      close: 215.24,
      high: 219.95,
      low: 213.56,
      open: 218.0,
      volume: 15544004,
      adjClose: 215.24,
      adjHigh: 219.95,
      adjLow: 213.56,
      adjOpen: 218.0,
      adjVolume: 15544004,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: yesterday,
      close: 217.64,
      high: 219.5,
      low: 213.88,
      open: 218.5,
      volume: 12705547,
      adjClose: 217.64,
      adjHigh: 219.5,
      adjLow: 213.88,
      adjOpen: 218.5,
      adjVolume: 12705547,
      divCash: 0.0,
      splitFactor: 1.0,
    },
    {
      date: today,
      close: 290.05,
      high: 295.59,
      low: 288.25,
      open: 295.26,
      volume: 16304018,
      adjClose: 290.05,
      adjHigh: 295.59,
      adjLow: 288.25,
      adjOpen: 295.26,
      adjVolume: 16304018,
      divCash: 0,
      splitFactor: 1,
    },
  ],
  FAKE: [
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
      date: yesterday,
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
      date: today,
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
  ],
};

// invalid tickers return: {"detail":"Error: Ticker 'FAKE' not found"}
export const API_META = {
  AMZN: {
    description:
      'Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. Customer reviews, 1-Click shopping, personalized recommendations, Prime, Fulfillment by Amazon, AWS, Kindle Direct Publishing, Kindle, Fire tablets, Fire TV, Amazon Echo, and Alexa are some of the products and services pioneered by Amazon.',
    endDate: '2020-09-25',
    exchangeCode: 'NASDAQ',
    startDate: '1997-05-15',
    name: 'Amazoncom Inc',
    ticker: 'AMZN',
  },
  MSFT: {
    description:
      'Microsoft (Nasdaq \u201cMSFT\u201d @microsoft) enables digital transformation for the era of an intelligent cloud and an intelligent edge. Its mission is to empower every person and every organization on the planet to achieve more.',
    endDate: '2020-09-25',
    exchangeCode: 'NASDAQ',
    startDate: '1986-03-13',
    name: 'Microsoft Corp',
    ticker: 'MSFT',
  },
  BABA: {
    description:
      'Alibaba Group\u2019s mission is to make it easy to do business anywhere. The company aims to build the future infrastructure of commerce. It envisions that its customers will meet, work and live at Alibaba, and that it will be a good company that lasts for 102 years.',
    endDate: '2020-09-25',
    exchangeCode: 'NYSE',
    startDate: '2014-09-19',
    name: 'Alibaba Group Holding Ltd',
    ticker: 'BABA',
  },
  FAKE: {
    endDate: '2020-08-28',
    description: 'Lorem ipsum.',
    exchangeCode: 'NASDAQ',
    ticker: 'FAKE',
    name: 'Fake AF Inc',
    startDate: '2010-06-29',
  },
};

// copy/paste to quickly mock localstorage
// window.localStorage.setItem('portfolio',JSON.stringify({ name: 'To The Moon', lots: [ { id: 1234, symbol: 'AMZN', boughtShares: 1, boughtDate: '2020-06-16', broker: 'Robinhood', boughtPrice: 2619.97, soldShares: 1, soldDate: '2020-07-13', soldPrice: 3175.0, }, { id: 3456, symbol: 'MSFT', boughtShares: 5, boughtDate: '2020-07-14', broker: 'Robinhood', boughtPrice: 107.97, soldShares: 0, soldDate: null, soldPrice: null, }, { id: 2345, symbol: 'BABA', boughtShares: 2, boughtDate: '2020-05-07', broker: 'Robinhood', boughtPrice: 199.6, soldShares: 0, soldDate: null, soldPrice: null, }, ],}))

export const DEPOSITS = {
  20200506: 100,
};
