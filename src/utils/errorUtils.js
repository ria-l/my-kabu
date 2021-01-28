import * as apiCalls from './apiCalls';

/**
 *
 * @param {?} value
 * @returns truthy/falsy
 */
export const isString = (value) => {
  const isString = typeof value === 'string';
  return isString;
};

/**
 *
 * @param {?} value
 * @returns truthy/falsy
 */
export const isNum = (value) => {
  const isNum = !isNaN(Number(value));
  return isNum;
};

/**
 *
 * @param {Object} fieldValues
 * @returns truthy/falsy
 */
export const fieldsAreValid = (fieldValues) => {
  const fieldTypes = getFieldTypes(fieldValues);
  let typesAreValid = false;
  for (const field in fieldTypes) {
    if (!fieldTypes[field]) {
      typesAreValid = false;
    }
    typesAreValid = true;
  }

  const fieldsAreFilled =
    fieldValues.ticker &&
    fieldValues.boughtShares &&
    fieldValues.boughtPrice &&
    fieldValues.date &&
    fieldValues.broker;
  return fieldsAreFilled && typesAreValid;
};

const getFieldTypes = (fieldValues) => {
  return {
    ticker: isString(fieldValues.ticker),
    boughtShares: isNum(fieldValues.boughtShares),
    boughtPrice: isNum(fieldValues.boughtPrice),
    broker: isString(fieldValues.broker),
  };
};

const fieldLabels = {
  ticker: 'Symbol',
  boughtShares: 'Number of Shares',
  boughtPrice: 'Buy Price',
  date: 'Date',
  broker: 'Broker',
};

export const getTypeErrorMsg = (fieldValues) => {
  const fieldTypes = getFieldTypes(fieldValues);
  let msg = '';
  for (let [field, value] of Object.entries(fieldTypes)) {
    if (!value) {
      msg += `${fieldLabels[field]}, `;
    }
  }
  return msg;
};

export const getMissingErrorMsg = (fieldValues) => {
  let msg = '';
  for (let [field, value] of Object.entries(fieldValues)) {
    if (!value) {
      msg += `${fieldLabels[field]}, `;
    }
  }
  return msg;
};

export async function validateTicker(ticker) {
  const stockMeta = apiCalls.getStockMetadata(ticker);
  if (stockMeta['ticker'] === ticker) {
    return false;
  } else {
    return true;
  }
}
