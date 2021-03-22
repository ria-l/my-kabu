import * as apiCalls from './apiCalls';

export async function validateTicker(ticker) {
  const stockMeta = await apiCalls.getStockMetadata(ticker);
  if (JSON.parse(stockMeta)['ticker'] === ticker) {
    return true;
  } else {
    return false;
  }
}
