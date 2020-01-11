/* eslint no-undef:"off" */

const {
  isDate,
  isDateAfter,
  isDateBefore,
  isDateGreaterThan,
  isDateLessThan,
  isInteger,
  isIsoDateTimeString,
  isFloat,
  isNumber,
  isObject,
  isObjectLike,
  isObjectWithExpectedProps,
  isPopulatedObject,
} = require('../index');

// #region jasmine setup
const origTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

const revertJasmineTimeout = function revertJasmineTimeout() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = origTimeout;
};

const setJasmineTimeout = function setJasmineTimeout(milliseconds) {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = milliseconds;
};

// you can set more options than are shown here: see https://jasmine.github.io/api/edge/Reporter.html
// tutorial: https://jasmine.github.io/tutorials/custom_reporter
const myReporter = {
  jasmineStarted: function jasmineStarted(suiteInfo, done) {
    // optional setup goes here
    setJasmineTimeout(10000);
    done();
  },
  jasmineDone: function jasmineDone(suiteInfo, done) {
    console.log(`Tests ended ${new Date().toLocaleString()}`);
    revertJasmineTimeout();
    done();
  },
};

jasmine.getEnv().addReporter(myReporter);
// #endregion jasmine setup

describe('isDate', () => {
  it('tests for Dates', () => {
    expect(isDate(1)).toBe(false);
    expect(isDate(new Date())).toBe(true);
  });
});

describe('isDateGreaterThan', () => {
  it('tests for Dates after another date', () => {
    const marchFirst2020 = new Date(2020, 2, 1, 0, 0, 0, 0);
    const marchFifteenth2020 = new Date(2020, 2, 15);

    expect(isDateGreaterThan('not a date', marchFifteenth2020)).toBe(false);
    expect(isDateGreaterThan(marchFirst2020, marchFifteenth2020)).toBe(false);
    expect(isDateGreaterThan(marchFifteenth2020, marchFirst2020)).toBe(true);
    // equal
    expect(isDateGreaterThan(marchFirst2020, marchFirst2020)).toBe(false);
  });

  it('has an alias', () => {
    expect(isDateAfter).toEqual(isDateGreaterThan);
  });
});

describe('isDateLessThan', () => {
  it('tests for Dates after another date', () => {
    const marchFirst2020 = new Date(2020, 2, 1, 0, 0, 0, 0);
    const marchFifteenth2020 = new Date(2020, 2, 15);

    expect(isDateLessThan('not a date', marchFifteenth2020)).toBe(false);
    expect(isDateLessThan(marchFirst2020, marchFifteenth2020)).toBe(true);
    expect(isDateLessThan(marchFifteenth2020, marchFirst2020)).toBe(false);
    // equal
    expect(isDateLessThan(marchFirst2020, marchFirst2020)).toBe(false);
  });

  it('has an alias', () => {
    expect(isDateBefore).toEqual(isDateLessThan);
  });
});

describe('isFloat', () => {
  it('tests for floats', () => {
    expect(isFloat('asdf')).toBeFalse();
    expect(isFloat(12)).toBeFalse();
    expect(isFloat(5.0)).toBeFalse();
    expect(isFloat(12.32)).toBeTrue();
  });
});

describe('isInteger', () => {
  it('tests for integers', () => {
    expect(isInteger('asdf')).toBeFalse();
    expect(isInteger(12.32)).toBeFalse();
    expect(isInteger(12)).toBeTrue();
    expect(isInteger(5.0)).toBeTrue();
  });
});

describe('isIsoDateTimeString', () => {
  it('tests for strings', () => {
    expect(isIsoDateTimeString(12)).toBeFalse();
    expect(isIsoDateTimeString(new Date())).toBeFalse();
  });

  it('tests for the +/- hh:mm format', () => {
    // error path
    const monthTensMoreThan1 = '2000-31-01T01:01:01-10:00';
    const dayTensMoreThan3 = '2000-01-41T01:01:01-10:00';
    const hourTensMoreThan2 = '2000-01-01T31:01:01-10:00';
    const minuteTensMoreThan5 = '2000-01-01T01:71:01-10:00';
    const secondTensMoreThan5 = '2000-01-01T01:01:61-10:00';
    const hourOffsetTensMoreThan2 = '2000-01-01T01:01:01-30:00';
    const minuteOffsetTensMoreThan5 = '2000-01-01T01:01:01-10:90';

    // happy path
    const noMilliseconds = '2000-01-01T01:01:01-10:00';
    const withMilliseconds = '2000-01-01T01:01:01.234-10:00';
    const usesAplusSign = '2000-01-01T01:01:01+09:00';

    expect(isIsoDateTimeString(monthTensMoreThan1)).toBeFalse();
    expect(isIsoDateTimeString(dayTensMoreThan3)).toBeFalse();
    expect(isIsoDateTimeString(hourTensMoreThan2)).toBeFalse();
    expect(isIsoDateTimeString(minuteTensMoreThan5)).toBeFalse();
    expect(isIsoDateTimeString(secondTensMoreThan5)).toBeFalse();
    expect(isIsoDateTimeString(hourOffsetTensMoreThan2)).toBeFalse();
    expect(isIsoDateTimeString(minuteOffsetTensMoreThan5)).toBeFalse();

    expect(isIsoDateTimeString(noMilliseconds)).toBeTrue();
    expect(isIsoDateTimeString(withMilliseconds)).toBeTrue();
    expect(isIsoDateTimeString(usesAplusSign)).toBeTrue();
  });

  it('tests for the Z format', () => {
    // error path
    const monthTensMoreThan1 = '2000-31-01T01:01:01Z';
    const dayTensMoreThan3 = '2000-01-41T01:01:01Z';
    const hourTensMoreThan2 = '2000-01-01T31:01:01Z';
    const minuteTensMoreThan5 = '2000-01-01T01:71:01Z';
    const secondTensMoreThan5 = '2000-01-01T01:01:61Z';
    const lowerCaseZ = '2000-01-01T01:01:01z';

    // happy path
    const noMilliseconds = '2000-01-01T01:01:01Z';
    const withMilliseconds = '2000-01-01T01:01:01.234Z';

    expect(isIsoDateTimeString(monthTensMoreThan1)).toBeFalse();
    expect(isIsoDateTimeString(dayTensMoreThan3)).toBeFalse();
    expect(isIsoDateTimeString(hourTensMoreThan2)).toBeFalse();
    expect(isIsoDateTimeString(minuteTensMoreThan5)).toBeFalse();
    expect(isIsoDateTimeString(secondTensMoreThan5)).toBeFalse();
    expect(isIsoDateTimeString(lowerCaseZ)).toBeFalse();

    expect(isIsoDateTimeString(noMilliseconds)).toBeTrue();
    expect(isIsoDateTimeString(withMilliseconds)).toBeTrue();
  });
});

describe('isNumber', () => {
  it('returns false for NaN', () => {
    expect(isNumber(NaN)).toBeFalse();
  });

  it('returns false on non-number values', () => {
    expect(isNumber('asdfasdf')).toBeFalse();
    expect(isNumber({})).toBeFalse();
  });

  it('returns true for number values, including Infinity', () => {
    expect(isNumber(12)).toBeTrue();
    expect(isNumber(12.999)).toBeTrue();
    expect(isNumber(1 / 3)).toBeTrue();
    expect(isNumber(Infinity)).toBeTrue();
    expect(isNumber(-Infinity)).toBeTrue();
  });
});

describe('isObject', () => {
  it('returns false for other known primitives', () => {
    expect(isObject(123)).toBeFalse();
    expect(isObject('string')).toBeFalse();
    // type is symbol
    expect(isObject(Symbol('s'))).toBeFalse();
  });

  it('returns true for objects', () => {
    expect(isObject({})).toBeTrue();
    expect(isObject(['an array', 'does not have its own primitive type'])).toBeTrue();
    expect(isObject(new Date())).toBeTrue();
  });
});

describe('isObjectLike', () => {
  const referenceObject = {
    age: 23,
    name: 'Bob',
    speak: (x) => console.log(x),
  };

  const makeTestObject = function makeTestObject(age = 3, name = 'Charlie') {
    const speak = (x) => console.log(x);
    return { age, name, speak };
  };

  it('throws if referenceObject is not an object', () => {
    expect(() => isObjectLike({ tested: false }, 12)).toThrow();
    expect(() => isObjectLike({ tested: false }, 'no strings, either')).toThrow();
    expect(() => isObjectLike({ tested: false }, null)).toThrow();
  });

  it('returns false if the "object" is not an object', () => {
    expect(isObjectLike(12, referenceObject)).toBe(false);
    expect(isObjectLike(null, referenceObject)).toBe(false);
  });

  it('returns true if the props are there (with type checking off by default)', () => {
    expect(isObjectLike(makeTestObject('no type checking', 'Alice'), referenceObject)).toBe(true);
    expect(isObjectLike(makeTestObject(99, 'Xavier'), referenceObject)).toBe(true);
  });

  it('returns false if the props are not there', () => {
    expect(isObjectLike({ age: 12, name: 'speak is missing' }, referenceObject)).toBe(false);
    expect(isObjectLike(['this is', 'a totally different object'], referenceObject)).toBe(false);
    expect(isObjectLike(['this is', 'a totally different object'], referenceObject, { checkType: false }))
      .toBe(false);
  });

  it('returns false if there are more props in the testObject than are in the referenceObject', () => {
    const itHasMoreProps = makeTestObject(72, 'Jans');
    itHasMoreProps.someAdditionalProp = true;
    expect(isObjectLike(itHasMoreProps, referenceObject)).toBe(false);
  });

  it('optionally checks types', () => {
    // wrong type, no type checking
    expect(isObjectLike(
      makeTestObject('oops', 'wrong type'),
      referenceObject,
      { checkType: false },
    )).toBe(true);

    // wrong type, with type checking
    expect(isObjectLike(
      makeTestObject('oops', 'wrong type'),
      referenceObject,
      { checkType: true },
    )).toBe(false);

    // correct type, with type checking
    expect(isObjectLike(
      makeTestObject(34, 'correct type'),
      referenceObject,
      { checkType: true },
    )).toBe(true);
  });
});

describe('isObjectWithExpectedProps', () => {
  const testObject = { foo: 42 };

  it('throws if arrayOfProps is not an array of strings', () => {
    expect(() => isObjectWithExpectedProps(testObject, 12)).toThrow();
    expect(() => isObjectWithExpectedProps(testObject, ['allNeedToBeStrings', 12])).toThrow();
    expect(() => isObjectWithExpectedProps(testObject, ['notHere'])).not.toThrow();
  });

  it('returns false if the "object" is not an object', () => {
    expect(isObjectWithExpectedProps(12, ['foo'])).toBe(false);
    expect(isObjectWithExpectedProps(null, ['foo'])).toBe(false);
  });

  it('returns true if the props are there', () => {
    expect(isObjectWithExpectedProps(testObject, ['foo'])).toBe(true);
  });

  it('returns false if the props are not there', () => {
    expect(isObjectWithExpectedProps(testObject, ['notThere'])).toBe(false);
    expect(isObjectWithExpectedProps(testObject, ['foo', 'notThere'])).toBe(false);
  });
});

describe('isPopulatedObject', () => {
  it('returns false for non-object (non {}) input', () => {
    expect(isPopulatedObject(12)).toBe(false);
    expect(isPopulatedObject(null)).toBe(false);
  });

  it('returns false for {} with no keys and no symbols', () => {
    expect(isPopulatedObject({})).toBe(false);
  });

  it('returns true for {} with keys', () => {
    const onlyHasAmethod = {
      returnA() {
        return 'a';
      },
    };

    expect(isPopulatedObject({ hi: 'there' })).toBe(true);

    expect(isPopulatedObject(onlyHasAmethod)).toBe(true);
  });

  it('returns true for {} with symbols', () => {
    const testSymbol = Symbol('testSymbol');
    // eslint-disable-next-line prefer-const
    let x = {};

    x[testSymbol] = 'hi';

    expect(isPopulatedObject(x)).toBe(true);
  });
});
