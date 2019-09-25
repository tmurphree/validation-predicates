/* eslint no-undef:"off" */

const { isObjectWithExpectedProps } = require('../index');

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

describe('isObjectWithExpectedProps', () => {
  const testObject = { foo: 42 };

  it('throws if arrayOfProps is not an array of strings', () => {
    expect(() => isObjectWithExpectedProps(testObject, 12)).toThrow();
    expect(() => isObjectWithExpectedProps(testObject, ['allNeedToBeStrings', 12])).toThrow();
    expect(() => isObjectWithExpectedProps(testObject, ['notHere'])).not.toThrow();
  });

  it('returns false if the "object" is not an object', () => {
    expect(isObjectWithExpectedProps(12, ['foo'])).toBe(false);
  });

  it('returns true if the props are there', () => {
    expect(isObjectWithExpectedProps(testObject, ['foo'])).toBe(true);
  });

  it('returns false if the props are not there', () => {
    expect(isObjectWithExpectedProps(testObject, ['notThere'])).toBe(false);
    expect(isObjectWithExpectedProps(testObject, ['foo', 'notThere'])).toBe(false);
  });
});
