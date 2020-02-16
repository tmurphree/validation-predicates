# validation-predicates

# Why
Functions that take some of the pain out of validating input.  Turns validation syntax into readable, easily-combinable functions.  This makes you more likely to do it.  

There are other great libraries out there that do similar things:
* [Generic validators](https://www.npmjs.com/package/validation-utils)    
* [String validation](https://github.com/validatorjs/validator.js)  
 
Please use them if you're looking for a different take on the same subject.  

# Change log  
[Link to changes](https://github.com/tmurphree/validation-predicates/blob/master/CHANGELOG.md)  

# Installation

npm install --save @tmurphree/validation-predicates  

# Usage  

``` js
const { 
  isNumberGreaterThan,
  isPopulatedArray,
  isString,  
} = require('@tmurphree/validation-predicates');

// the old way: not as readable
// const firstIsValid = function firstIsValid(x) {
//   return typeof x === 'number' &&
//     x > 5;
// };
//
// const secondIsValid = function secondIsValid(x) {
//   return Array.isArray(x) &&
//      x.length > 0 &&
//      x.every((el) => typeof el === 'string') &&
//      x.every((el) => el.length > 2);
// };

// the same tests using validation-predicates 
const firstIsValid = function firstIsValid(x) {
  return isNumberGreaterThan(x, 5);
};

const secondIsValid = function secondIsValid(x) {
  return isPopulatedArray(x) &&
    x.every(isString) &&
    // mix and match with predicates not in the package
    x.every((el) => el.length > 2);
};

const someFunction = function someFunction(first, second) {
  if (!(firstIsValid(first))) {
    throw new Error('Expected first to be a number > 5.');
  }

  if (!(secondIsValid(second))) {
    throw new Error('Expected second to be an array of strings longer than 2 characters.');
  }

  // amazing code goes here
};

someFunction(42, ['some','array']);
```

## Strict mode  
Some functions have options.  Strict mode is a convenient way to set some of the options.  **You can always, in both modes, set the options manually.**

Without strict mode:  
``` js
const { isDate, isObjectLike } = require('@tmurphree/validation-predicates');

// isDate, which has no options, is not changed

// isObjectLike(a, b) is called with { checkType: false } by default
// but you can still call isObjectLike(a, b, { checkType: true })
```

With strict mode:  
``` js
const { isDate, isObjectLike } = require('@tmurphree/validation-predicates').strict;

// isDate, which has no options, is not changed

// isObjectLike(a, b) is called with { checkType: true } by default
// but you can still call isObjectLike(a, b, { checkType: false })
```


# Functions  
* All functions return `boolean`.  
* Parameters not in brackets are required.  
* Parameters in brackets are optional.  
* 'x' in the parameters list is the thing you want to test.  

|Function|Summary|  
|---|---|  
|isArray(x)|x is an array|  
|isBigInt(x)|x is a BigInt|  
|isBoolean(x)|x is a boolean|  
|isDate(x)|x is a Date|  
|isDateAfter(x, someDate)|alias for isDateGreaterThan|  
|isDateBefore(x, someDate)|alias for isDateLessThan|  
|isDateGreaterThan(x, someDate)|x is a Date greater than (after) someDate|  
|isDateLessThan(x, someDate)|x is a Date less than (before) someDate|  
|isFloat(x)|x is a number (see isNumber) and has a nonzero decimal. e.g. 5.0 is NOT a float, but 5.01 is.|  
|isFunction(x)|x is a function|  
|isInteger(x)|x is a number (see isNumber) and has a zero-value decimal. e.g. 5 and 5.0 are both integers, but 5.01 is NOT.|  
|isIsoDateTimeString(x)|x is a string and matches a subset of the ISO 8601 date time string format.<br><br>Checks for these patterns (note that the plus can be plus or minus and that 'milliseconds' is 'one or more digits'):<br>* YYYY-MM-DDThh:mm:ssZ<br>* YYYY-MM-DDThh:mm:ss.millisecondsZ<br>* YYYY-MM-DDThh:mm:ss+hh:mm<br>* YYYY-MM-DDThh:mm:ss.milliseconds+hh:mm|    
|isNull(x)|x is null|  
|isNullOrUndefined(x)|x is null or undefined|  
|isNumber(x)|x is a number and is not NaN|  
|isNumberGreaterThan(x, anotherNumber)|x is a number and is greater than anotherNumber|  
|isNumberLessThan(x, anotherNumber)|x is a number and is less than anotherNumber|  
|isObject(x)|x is an object per the definition in 'typeof' EXCEPT that it returns false for null.  Basically, this means it isn't another known type of primitive and is not null.  See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).|  
|isObjectLike(x, template, [options={ allowExtraProps: true, checkType: false, debug: false }])|x is an object and has exactly the same properties as template.  x does not have properties not in template.  Does not check symbols.<br><br>**Strict mode changes the default to { checkType: true }.  Other defaults remain the same.**<br><br>Options: <br> * `allowExtraProps` Return true if the object to test has properties not in template and other tests pass.<br>* `checkType`  If true, checks that the properties are the same type **BUT** this is rudimentary checking (with typeof).<br> * `debug` If true, prints debug information to the console.|  
|isObjectWithExpectedProps(x, arrayOfStrings)|x is an object and every string in arrayOfStrings is a property of x.  x may have properties not in arrayOfStrings.|  
|isPopulatedArray(x)|x is an array with at least one element|  
|isPopulatedObject(x)|x is an object with at least one property or Symbol|
|isPopulatedString(x)|x is a string with at least one character|  
|isString(x)|x is a string|  
|isSymbol(x)|x is a [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)|  
|isUndefined(x)|x is undefined|  
|isZeroLength(x)|x has a length property that === 0|  
