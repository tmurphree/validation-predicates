const main = function main(args = { strict: false }) {
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

  const isDate = function isDate(x) {
    return x instanceof Date;
  };

  const isFunction = function isFunction(x) {
    return checkType(x, 'function');
  };

  const isNull = function isNull(x) {
    return x === null;
  };

  /**
   * @description Checks for a number.  Returns false for NaN.
   * @param {number} x The number to check.
   */
  const isNumber = function isNumber(x) {
    return checkType(x, 'number') &&
      !(Number.isNaN(x));
  };

  /**
   * @description Checks for an object (e.g. { message: 'hi' }).  This is a basic check
   *    that relies on typeof, so perhaps a better name for it is 'is not some other primitive'.
   * @param {object} x The object to test.
   * @returns {boolean} boolean
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
   */
  const isObject = function isObject(x) {
    return checkType(x, 'object') && !(isNull(x));
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

  // #region more-complex functions

  /**
   * @description Checks for a date greater than (after) someDate.
   *   isDateAfter is an alias of isDateGreaterThan.
   * @param {number} x The number to test.
   * @param {number} someNumber The number to compare to.
   * @returns {boolean} boolean
   */
  const isDateGreaterThan = function isDateGreaterThan(x, someDate) {
    if (!(isDate(someDate))) {
      throw new Error('Expected the second agument to be a date');
    }

    return isDate(x) && (x > someDate);
  };

  /**
   * @description Checks for a date less than (before) someNumber.
   *   isDateBefore is an alias of isDateLessThan.
   * @param {number} x The number to test.
   * @param {number} someNumber The number to compare to.
   * @returns {boolean} boolean
   */
  const isDateLessThan = function isDateLessThan(x, someDate) {
    if (!(isDate(someDate))) {
      throw new Error('Expected the second agument to be a date');
    }

    return isDate(x) && (x < someDate);
  };

  /**
   * @description Checks for a floating point number (a number with a nonzero decimal).
   * @param {number} x The number to test.
   * @returns {boolean} boolean
  */
  const isFloat = function isFloat(x) {
    return isNumber(x) && (x !== Math.floor(x));
  };

  /**
   * @description Checks for an integer.  Allows zero-value decimals e.g. 5.0.
   * @param {number} x The number to test.
   * @returns {boolean} boolean
  */
  const isInteger = function isInteger(x) {
    return isNumber(x) && Number.isInteger(x);
  };

  /**
   * @description Checks for an ISO 8601-compliant date string.  Only checks these formats:
   *    // with or without milliseconds, with the +/- hh:mm at the end
   *    2020-01-11T15:03:11-10:00 || 2020-01-11T15:03:11.999-10:00
   *    // with or without milliseconds, with the Z at the end
   *    2020-01-11T15:03:11Z || 2020-01-11T15:03:11.999Z
   * @param {string} x The string to test.
   * @returns {boolean} boolean
  */
  const isIsoDateTimeString = function isIsoDateTimeString(x) {
    const hhmmNoMilliseconds = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d[+-][0-2]\d:[0-5]\d$/;
    const hhmmWithMilliseconds = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d{1,}[+-][0-2]\d:[0-5]\d$/;
    const zNoMilliseconds = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\dZ$/;
    const zWithMilliseconds = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d{1,}Z$/;

    return isString(x) && (
      zWithMilliseconds.test(x) ||
      zNoMilliseconds.test(x) ||
      hhmmWithMilliseconds.test(x) ||
      hhmmNoMilliseconds.test(x)
    );
  };

  const isNullOrUndefined = function isNullOrUndefined(x) {
    return isNull(x) || isUndefined(x);
  };

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

  const isPopulatedObject = function isPopulatedObject(x) {
    return isObject(x) &&
      (Object.keys(x).length > 0 || Object.getOwnPropertySymbols(x).length > 0);
  };

  const isPopulatedArray = function isPopulatedArray(x) {
    return isArray(x) && x.length > 0;
  };

  const isPopulatedString = function isPopulatedString(x) {
    return isString(x) && x.length > 0;
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
   * @description Checks that an object has the same properties as a reference object.  Optionally
   *   checks to make sure that the properties are of the same type.  Does not check symbols.
   * @param {object} x The object to test.
   * @param {object} template The object you want x to look like.
   * @param {object} [options] Options.
   * @param {boolean} [options.allowExtraProps=false] Return true if the object to test has
   *   properties not in template and other tests pass.
   * @param {boolean} [options.checkType=false] Strict mode changes the default to true.  Return
   *   false if the properties are there but are of different types.
   * @param {boolean} [options.debug=false] Print troubleshooting info to console.
   * @returns {boolean} boolean
  */
  const isObjectLike = function isObjectLike(
    x,
    template,
    options = { allowExtraProps: false, checkType: args.strict, debug: false },
  ) {
    if (!(isObject(template))) {
      throw new Error('Expected template to be an object.');
    }

    if (!(isObject(options))) {
      throw new Error('Expected options to be an object.');
    }

    // avoid errors in calculating propertiesCheckPasses
    if (!(isObject(x))) {
      return false;
    }

    const objectPropsAreSameType = function objectPropsAreSameType() {
      return isObject(x) && Object.keys(x)
        .every((el) => {
          if (options.debug && (typeof x[el] !== typeof template[el])) {
            console.log(`Property type mismatch detected for property ${el}`);
            console.log(`Got ${typeof x[el]}, expected ${typeof template[el]}`);
          }

          return typeof x[el] === typeof template[el];
        });
    };

    const propertiesCheckPasses = options.allowExtraProps ?
      true :
      Object.keys(x).length === Object.keys(template).length;

    const typeCheckPasses = options.checkType ?
      objectPropsAreSameType() :
      true;

    if (options.debug) {
      console.log(`x is ${JSON.stringify(x, null, 2)}`);
      console.log(`template is ${JSON.stringify(template, null, 2)}`);
      console.log(`isObjectWithExpectedProps? ${isObjectWithExpectedProps(x, Object.keys(template))}`);
      if (isObject(x)) {
        console.log(`key length the same? ${Object.keys(x).length === Object.keys(template).length}`);
      }
      console.log(`objectPropsAreSameType? ${objectPropsAreSameType()}`);
    }

    return isObjectWithExpectedProps(x, Object.keys(template)) &&
      propertiesCheckPasses &&
      typeCheckPasses;
  };

  /**
   * @description Tests for a length property of 0.  Returns false if the length property
   *    doesn't exist.
   * @param {array} somePropName illuminatingDescription.
   * @returns {boolean} boolean
  */
  const isZeroLength = function isZeroLength(x) {
    return !(isNullOrUndefined(x.length)) && x.length === 0;
  };
  // #endregion more-complex functions

  return {
    isArray,
    isBigInt,
    isBoolean,
    isDate,
    isDateAfter: isDateGreaterThan,
    isDateBefore: isDateLessThan,
    isDateGreaterThan,
    isDateLessThan,
    isFunction,
    isFloat,
    isInteger,
    isIsoDateTimeString,
    isNull,
    isNullOrUndefined,
    isNumber,
    isNumberGreaterThan,
    isNumberLessThan,
    isObject,
    isObjectLike,
    isObjectWithExpectedProps,
    isPopulatedArray,
    isPopulatedObject,
    isPopulatedString,
    isString,
    isSymbol,
    isUndefined,
    isZeroLength,
  };
};

module.exports = {
  ...main(),
  strict: { ...main({ strict: true }) },
};
