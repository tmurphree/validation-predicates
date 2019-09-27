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

/**
 * @description Checks for an object (e.g. { message: 'hi' }).  Returns false for null and arrays.
 * @param {object} x The object to test.
 * @returns {boolean} boolean
 */
const isObject = function isObject(x) {
  return checkType(x, 'object') && !(isNull(x)) && !(isArray(x));
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

/**
 * @description Checks for a number greater than someNumber.
 * @param {number} x The number to test.
 * @param {number} someNumber The number to compare to.
 * @returns {boolean} boolean
 */
const isNumberGreaterThan = function isNumberGreaterThan(x, someNumber) {
  if (!(isNumber(someNumber))) {
    throw new Error('Expected the second agument to be a number');
  }

  return isNumber(x) && (x > someNumber);
};

/**
 * @description Checks for a number less than someNumber.
 * @param {number} x The number to test.
 * @param {number} someNumber The number to compare to.
 * @returns {boolean} boolean
 */
const isNumberLessThan = function isNumberLessThan(x, someNumber) {
  if (!(isNumber(someNumber))) {
    throw new Error('Expected the second agument to be a number');
  }

  return isNumber(x) && (x < someNumber);
};

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
 * @returns {boolean} boolean
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

/**
 * @description Checks that an object has the same properties as a reference object.  Also
 *   checks to make sure that the properties are of the same type.
 * @param {object} x The object to test.
 * @param {object} referenceObject The object you want x to look like.
 * @returns {boolean} boolean
*/
const isObjectLike = function isObjectLike(x, referenceObject) {
  if (!(isObject(referenceObject))) {
    throw new Error('Expected referenceObject to be an object.');
  }

  const objectPropsAreSameType = function objectPropsAreSameType() {
    return Object.keys(x)
      .every((el) => typeof x[el] === typeof referenceObject[el]);
  };

  return isObjectWithExpectedProps(x, Object.keys(referenceObject)) &&
    Object.keys(x).length === Object.keys(referenceObject).length &&
    objectPropsAreSameType();
};

// #endregion more-complex functions

module.exports = {
  isArray,
  isBigInt,
  isBoolean,
  isFunction,
  isNull,
  isNotNullOrUndefined,
  isNotZeroLength,
  isNumber,
  isNumberGreaterThan,
  isNumberLessThan,
  isObject,
  isObjectLike,
  isObjectWithExpectedProps,
  isPopulatedArray,
  isPopulatedString,
  isString,
  isSymbol,
  isUndefined,
};
