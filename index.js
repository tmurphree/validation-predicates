const checkType = function checkType(x, expected) {
  // eslint-disable-next-line valid-typeof
  return typeof x === expected;
};

// #region simple "is" functions

const isArray = function isArray(x) {
  return Array.isArray(x);
};

const isBigInt = function isBigInt(x) {
  return checkType(x, 'bigint');
};

const isBoolean = function isBoolean(x) {
  return checkType(x, 'boolean');
};

const isFunction = function isFunction(x) {
  return checkType(x, 'function');
};

const isNull = function isNull(x) {
  return x === null;
};

const isNumber = function isNumber(x) {
  return checkType(x, 'number');
};

const isObject = function isObject(x) {
  return checkType(x, 'object');
};

const isString = function isString(x) {
  return checkType(x, 'string');
};

const isSymbol = function isSymbol(x) {
  return checkType(x, 'symbol');
};

const isUndefined = function isUndefined(x) {
  return x === undefined;
};

// #endregion simple "is" functions

// #region "is not" functions

const isNotNullOrUndefined = function isNotNullOrUndefined(x) {
  return !(isNull(x)) && !(isUndefined(x));
};

const isNotZeroLength = function isNotZeroLength(x) {
  return x.length !== 0;
};

// #endregion "is not" functions

// #region more-complex functions

const isPopulatedArray = function isPopulatedArray(x) {
  return isArray(x) && isNotZeroLength(x);
};

const isPopulatedString = function isPopulatedString(x) {
  return isString(x) && isNotZeroLength(x);
};

/**
 * @description Checks for an object with required properties.
 * @param {object} x The object to test.
 * @param {string[]} arrayOfProps An array of strings with the propery names to test for.
 * @returns {boolean}
 */
const isObjectWithExpectedProps = function isObjectWithExpectedProps(x, arrayOfProps) {
  if (!(isArray(arrayOfProps)) || !(arrayOfProps.every(isString))) {
    throw new Error('Expected arrayOfProps to be an array of strings.');
  }

  // aviod return arrayOfProps.every((el) => !(isUndefined(x[el])));
  // we get false positives if a prop exists but === undefined
  // e.g. { foo: undefined } will return a false negative for foo
  return isObject(x) && arrayOfProps.every((el) => Object.keys(x).includes(el));
};

// #endregion more-complex functions

module.exports = {
  isArray,
  isBigInt,
  isBoolean,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isObjectWithExpectedProps,
  isPopulatedArray,
  isPopulatedString,
  isString,
  isSymbol,
  isUndefined,
  isNotNullOrUndefined,
  isNotZeroLength,
};
