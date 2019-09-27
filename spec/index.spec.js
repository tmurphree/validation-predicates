/* eslint no-undef:"off" */

const { isObjectLike, isObjectWithExpectedProps } = require('../index');

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
    expect(() => isObjectLike({ tested: false }, ['no Arrays please'])).toThrow();
    expect(() => isObjectLike({ tested: false }, 'no strings, either')).toThrow();
    expect(() => isObjectLike({ tested: false }, null)).toThrow();
  });

  it('returns false if the "object" is not an object', () => {
    expect(isObjectLike(12, referenceObject)).toBe(false);
    expect(isObjectLike(null, referenceObject)).toBe(false);
    expect(isObjectLike(['no Arrays please'], referenceObject)).toBe(false);
  });

  it('returns true if the props are there', () => {
    expect(isObjectLike(makeTestObject(18, 'Alice'), referenceObject)).toBe(true);
  });

  it('returns false if the props are not there', () => {
    expect(isObjectLike({ age: 12, name: 'speak is missing' }, referenceObject)).toBe(false);
  });

  it('returns false if there are more props in the testObject than are in the referenceObject', () => {
    const itHasMoreProps = makeTestObject(72, 'Jans');
    itHasMoreProps.someAdditionalProp = true;
    expect(isObjectLike(itHasMoreProps, referenceObject)).toBe(false);
  });

  it('returns false if the props are not of the same type', () => {
    expect(isObjectLike(makeTestObject('oops', 'wrong type'), referenceObject)).toBe(false);
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
