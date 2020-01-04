# validation-predicates

# Why
Functions that take some of the pain out of validating input.  Turns validation syntax into readable, easily-combinable functions.  This makes you more likely to do it.  

There are other great libraries out there that do similar things:
* [Generic validators](https://www.npmjs.com/package/validation-utils)    
* [String validation](https://github.com/validatorjs/validator.js)  
 
Please use them if you're looking for a different take on the same subject.  

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
//      x.every((el) => typeof el === 'string');
// };

// the same tests using validation-predicates 
const firstIsValid = function firstIsValid(x) {
  return isNumberGreaterThan(x, 5);
};

const secondIsValid = function secondIsValid(x) {
  return isPopulatedArray(x) &&
    // mix and match with predicates not in the package
    x.every(isString);
};

const someFunction = function someFunction(first, second) {
  if (!(firstIsValid(first))) {
    throw new Error('Expected first to be a number > 5.');
  }

  if (!(secondIsValid(second))) {
    throw new Error('Expected second to be an array of strings.');
  }

  // amazing code goes here
};

someFunction(42, ['some','array']);
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
|isFunction(x)|x is a function|  
|isNotNullOrUndefined(x)|x is not null and not undefined|  
|isNotZeroLength(x)|length of x is > 0|  
|isNull(x)|x is null|  
|isNumber(x)|x is a number|  
|isNumberGreaterThan(x, anotherNumber)|x is a number and is greater than anotherNumber|  
|isNumberLessThan(x, anotherNumber)|x is a number and is less than anotherNumber|  
|isObject(x)|x is an object (e.g. { message: 'hi' }).  Returns false for null and arrays.|  
|isObjectLike(x, referenceObject, [options={ debug: false }])|x is an object and has the same properties with the same types as referenceObject.   Optional `options` object looks for a `debug` property with value `true` (e.g. { debug: true }).  If true, prints debug information to the console.|  
|isObjectWithExpectedProps(x, arrayOfStrings)|x is an object and every string in arrayOfStrings is a property of x|  
|isPopulatedArray(x)|x is an array with at least one element|  
|isPopulatedObject(x)|x is an object with at least one key or Symbol|
|isPopulatedString(x)|x is a string with at least one character|  
|isString(x)|x is a string|  
|isSymbol(x)|x is a [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)|  
|isUndefined(x)|x is undefined|  
