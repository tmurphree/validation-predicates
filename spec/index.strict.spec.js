/* eslint no-undef:"off" */

const {
  isDate,
  isInteger,
  isObjectLike,
} = require('../index').strict;

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

describe('strict mode', () => {
  it('does not change the behavior of tests that do not reference it', () => {
    expect(isDate(1)).toBeFalse();
    expect(isDate(new Date())).toBeTrue();

    expect(isInteger(1)).toBeTrue();
    expect(isInteger(1.009234323423)).toBeFalse();
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

  it('returns true if the props are there (with type checking on by default)', () => {
    expect(isObjectLike(makeTestObject('no type checking', 'Alice'), referenceObject)).toBeFalse();
    expect(isObjectLike(makeTestObject(99, 'Xavier'), referenceObject)).toBeTrue();
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
